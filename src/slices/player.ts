import { createSlice } from "@reduxjs/toolkit";

export interface IPlayer {
  totalPlaytime: number;
}

export class PlayerObject implements IPlayer {
  totalPlaytime: number;
  lastUpdate: number;
  lastSave: number;
}

const initialState: PlayerObject = {
  totalPlaytime: 0,
  lastUpdate: 0,
  lastSave: 0,
};

export const playerSlice = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    setPlayer: (player, action) => {
      player = action.payload;
    },
    setlastSave: (player, action) => {
      player.lastSave = action.payload;
    },
    addPlayTime: (player, action) => {
      player.totalPlaytime += action.payload;
    },
    setLastUpdate: (player, action) => {
      player.lastUpdate = action.payload;
    },
    FLUSH: (player) => {
      player.totalPlaytime = +1;
    },
  },
});

export const { setPlayer, setlastSave, addPlayTime, setLastUpdate } = playerSlice.actions;

export default playerSlice.reducer;
