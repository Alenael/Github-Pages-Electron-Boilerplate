import { isDevelopment } from "../../app/store";

function getDB(): Promise<IDBObjectStore> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject("Indexed DB does not exists");
    }
    const indexedDbRequest: IDBOpenDBRequest = window.indexedDB.open("testSave", 1);

    indexedDbRequest.onupgradeneeded = function (this: IDBRequest<IDBDatabase>) {
      const db = this.result;
      db.createObjectStore("savestring");
    };

    indexedDbRequest.onerror = function (this: IDBRequest<IDBDatabase>, ev: Event) {
      reject(`Failed to get IDB ${ev}`);
    };

    indexedDbRequest.onsuccess = function (this: IDBRequest<IDBDatabase>) {
      const db = this.result;
      if (!db) {
        reject("database loading result was undefined");
        return;
      }
      resolve(db.transaction(["savestring"], "readwrite").objectStore("savestring"));
    };
  });
}

export function load(): Promise<string> {
  return new Promise((resolve, reject) => {
    getDB()
      .then((db) => {
        return new Promise<string>((resolve, reject) => {
          const request: IDBRequest<string> = db.get(getDbName());
          request.onerror = function (this: IDBRequest<string>, ev: Event) {
            reject("Error in Database request to get savestring: " + ev);
          };

          request.onsuccess = function (this: IDBRequest<string>) {
            resolve(this.result);
          };
        }).then((saveString) => resolve(saveString));
      })
      .catch((r) => reject(r));
  });
}

function getDbName(): string {
  return isDevelopment ? "dev" : "save";
}

export function save(saveString: string): Promise<void> {
  return getDB().then((db) => {
    return new Promise<void>((resolve, reject) => {
      const request = db.put(saveString, getDbName());

      request.onerror = function (e) {
        reject("Error saving game to IndexedDB: " + e);
      };

      request.onsuccess = () => resolve();
    });
  });
}

export function deleteGame(): Promise<void> {
  return getDB().then((db) => {
    db.delete(getDbName());
  });
}
