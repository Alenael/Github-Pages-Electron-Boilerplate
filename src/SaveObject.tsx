// import { save } from "./db";
// import { setPlayer, setlastSave } from "./slices/player";
// import { store } from "./store";

// export class TestSaveObject {
//   PlayerSave = "";

//   private getSaveString(): string {
//     const saveString = btoa(unescape(encodeURIComponent(JSON.stringify(this))));
//     return saveString;
//   }

//   saveGame(): Promise<void> {
//     const state = store.getState();
//     const dispatch = store.dispatch;
//     this.PlayerSave = JSON.stringify(state.player);

//     dispatch(setlastSave(new Date().getTime()));
//     const saveString = this.getSaveString();
//     return new Promise((resolve, reject) => {
//       save(saveString)
//         .then(() => {
//           return resolve();
//         })
//         .catch((err) => {
//           console.error(err);
//           return reject();
//         });
//     });
//   }

//   loadGame(saveString: string): boolean {
//     if (!saveString) return false;
//     const dispatch = store.dispatch;
//     saveString = decodeURIComponent(escape(atob(saveString)));
//     const saveObj: TestSaveObject = JSON.parse(saveString);
//     dispatch(setPlayer(JSON.parse(saveObj.PlayerSave)));
//     return true;
//   }
// }

// export const saveObject = new TestSaveObject();
