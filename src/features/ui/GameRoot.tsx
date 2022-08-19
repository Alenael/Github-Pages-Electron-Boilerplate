import { Typography } from "@mui/material";

import { IEngine } from "../game/engine";
import { saveGame, resetGame } from "../../app/store";
import { deleteGame } from "../game/db";

import React from "react";
import { useAppSelector } from "../../app/hooks";
interface IProps {
  engine: IEngine;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function GameRoot({ engine }: IProps): React.ReactElement {
  const player = useAppSelector((state) => state.player);

  return (
    <div>
      <h1 className="text-xl">Formatted Text</h1>
      <Typography>
        Winner! {player.totalPlaytime} - {player.lastSave}
      </Typography>
      <button
        onClick={() => {
          saveGame();
        }}
      >
        Save Game
      </button>
      <button
        onClick={() => {
          deleteGame();
        }}
      >
        Purge Game
      </button>
      <button
        onClick={() => {
          resetGame();
        }}
      >
        Reset Game
      </button>
    </div>
  );
}
