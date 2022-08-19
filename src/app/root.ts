import { combineReducers } from "@reduxjs/toolkit";
import playerReducer from "../features/game/player";

export const rootReducer = combineReducers({
  player: playerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
