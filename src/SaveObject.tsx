import { Reviver, Generic_toJSON, Generic_fromJSON } from "./utils/JSONReviver";
import { save } from "./db";
import { loadPlayer, Player } from "./Player";

export interface SaveData {
  fileName: string;
  save: string;
  savedOn: number;
}

class TestSaveObject {
  PlayerSave = "";

  getSaveString(): string {
    this.PlayerSave = JSON.stringify(Player);

    const saveString = btoa(unescape(encodeURIComponent(JSON.stringify(this))));
    return saveString;
  }

  saveGame(): Promise<void> {
    const savedOn = new Date().getTime();
    Player.lastSave = savedOn;
    const saveString = this.getSaveString();
    return new Promise((resolve, reject) => {
      save(saveString)
        .then(() => {
          // const saveData: SaveData = {
          //   fileName: this.getSaveFileName(),
          //   save: saveString,
          //   savedOn,
          // };
          //pushGameSaved(saveData);

          // if (emitToastEvent) {
          //   SnackbarEvents.emit("Game Saved!", ToastVariant.INFO, 2000);
          // }
          return resolve();
        })
        .catch((err) => {
          console.error(err);
          return reject();
        });
    });
  }

  getSaveFileName(): string {
    const epochTime = Math.round(Date.now() / 1000);
    return `testSave-${epochTime}.json`;
  }

  toJSON(): any {
    return Generic_toJSON("TestSaveObject", this);
  }

  static fromJSON(value: { data: any }): TestSaveObject {
    return Generic_fromJSON(TestSaveObject, value.data);
  }
}

function loadGame(saveString: string): boolean {
  if (!saveString) return false;
  saveString = decodeURIComponent(escape(atob(saveString)));

  const saveObj = JSON.parse(saveString, Reviver);
  loadPlayer(saveObj.PlayerSave);
  return true;
}

Reviver.constructors.TestaveObject = TestSaveObject;

export { saveObject, loadGame };

const saveObject = new TestSaveObject();
