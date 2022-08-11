import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import playerReducer from "./slices/player";

export const isProduction = process.env.NODE_ENV !== "production";

const rootReducer = combineReducers({
  player: playerReducer,
});

export function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

export function saveToLocalStorage() {
  try {
    const serialisedState = JSON.stringify(store.getState());
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadFromLocalStorage(),
  devTools: isProduction,
  middleware: [thunk],
});

//store.subscribe(() => saveToLocalStorage());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
