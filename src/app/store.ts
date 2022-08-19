import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import { reset, setlastSave } from "../features/game/player";
import { deleteGame, save } from "../features/game/db";
import { rootReducer } from "./root";

export const isDevelopment = process.env.NODE_ENV !== "production";

export function saveGame(): Promise<void> {
  store.dispatch(setlastSave());
  let saveString = JSON.stringify(store.getState());
  if (!isDevelopment) saveString = btoa(unescape(encodeURIComponent(saveString)));

  return new Promise((resolve, reject) => {
    save(saveString)
      .then(() => {
        return resolve();
      })
      .catch((err) => {
        console.error(err);
        return reject();
      });
  });
}

export function resetGame() {
  store.dispatch(reset());
  deleteGame();
}

export const store = configureStore({
  reducer: rootReducer,
  devTools: !isDevelopment,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
