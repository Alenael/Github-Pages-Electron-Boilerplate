import React, { useContext } from "react";
import { Player } from "../Player";
import { IPlayer } from "../PlayerObject";

export const Context: {
  Player: React.Context<IPlayer>;
} = {
  Player: React.createContext<IPlayer>(Player as IPlayer),
};

export const use: {
  Player: () => IPlayer;
} = {
  Player: () => useContext(Context.Player),
};
