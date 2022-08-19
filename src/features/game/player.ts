import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPlayer {
  totalPlaytime: number;
}

export class PlayerObject implements IPlayer {
  totalPlaytime: number;
  lastUpdate: number;
  lastSave: number;
  time: number;
}

export const playerInitialState: PlayerObject = {
  totalPlaytime: 0,
  lastUpdate: 0,
  lastSave: 0,
  time: 0,
};

export const playerSlice = createSlice({
  name: "player",
  initialState: playerInitialState,
  reducers: {
    setPlayer: (player, action) => {
      return action.payload;
    },
    setlastSave: (player) => {
      player.lastSave = new Date().getTime();
    },
    addPlayTime: (player, action: PayloadAction<number>) => {
      console.log(player.totalPlaytime);
      player.totalPlaytime += action.payload;
    },
    setTime: (state) => {
      console.log(state);
      console.log(state.time);
      state.time += 5;
    },
    reset: (__state) => {
      return playerInitialState;
    },
  },
});

export const { setPlayer, setlastSave, addPlayTime, setTime, reset } = playerSlice.actions;
export default playerSlice.reducer;
