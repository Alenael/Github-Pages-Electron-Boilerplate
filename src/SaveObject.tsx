import { Reviver, Generic_toJSON, Generic_fromJSON } from "./utils/JSONReviver";
import { save } from "./db";

class TestSaveObject {
  SaveTimestamp = "";

  getSaveString(): string {
    this.SaveTimestamp = new Date().getTime().toString();

    const saveString = btoa(unescape(encodeURIComponent(JSON.stringify(this))));
    return saveString;
  }

  saveGame(): void {
    const saveString = this.getSaveString();

    save(saveString)
      .then(() => {
        // if (emitToastEvent) {
        //   SnackbarEvents.emit("Game Saved!", "info", 2000);
        // }
        console.log("Game Saved!");
      })
      .catch((err) => console.error(err));
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

  const __saveObj = JSON.parse(saveString, Reviver);
  return true;
}

function download(filename: string, content: string): void {
  const file = new Blob([content], { type: "text/plain" });
  const navigator = window.navigator as any;
  if (navigator.msSaveOrOpenBlob) {
    // IE10+
    navigator.msSaveOrOpenBlob(file, filename);
  } else {
    // Others
    const a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

Reviver.constructors.TestaveObject = TestSaveObject;

export { saveObject, loadGame, download };

const saveObject = new TestSaveObject();
