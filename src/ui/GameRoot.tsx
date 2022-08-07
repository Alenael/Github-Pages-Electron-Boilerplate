import React from "react";
import { Typography } from "@mui/material";

import { IEngine } from "../Engine";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { saveObject } from "../SaveObject";

interface IProps {
  engine: IEngine;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function GameRoot({ engine }: IProps): React.ReactElement {
  const player = useSelector((state: RootState) => state.player);
  return (
    <div>
      <h1 className="text-xl">Formatted Text</h1>
      <Typography>
        Winner! {player.lastUpdate} - {player.totalPlaytime} - {player.lastSave}
      </Typography>
      <button
        onClick={() => {
          saveObject.saveGame();
        }}
      >
        Save Game
      </button>
    </div>
  );
}
