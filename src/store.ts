import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createIdbStorage from "@piotr-cz/redux-persist-idb-storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import playerReducer from "./slices/player";

const isProduction = process.env.NODE_ENV !== "production";
const storage = createIdbStorage({ name: "Test", storeName: "Save" });

const rootPersistConfig = {
  key: "root",
  storage: storage,
  serialize: isProduction,
};

const playerPersistConfig = {
  key: "player",
  storage: storage,
};

const rootReducer = combineReducers({
  player: persistReducer(playerPersistConfig, playerReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: isProduction,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
