import React, { useEffect, useState } from "react";
import { use } from "./Context";
import { Typography } from "@mui/material";

import { IEngine } from "../Engine";
//import { IPlayer } from "../PlayerObject";

interface IProps {
  engine: IEngine;
}

export function GameRoot({ engine }: IProps): React.ReactElement {
  // const [__localEngine, setEngine] = React.useState(engine);
  // const setRerender = React.useState(0)[1];
  //console.log(count);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const rerender = () => setRerender((old) => old + 1);

  // useEffect(() => {
  //   rerender();
  // }, [engine]);
  const setRerender = useState(false)[1];
  function rerender(): void {
    setRerender((old) => !old);
  }

  useEffect(() => {
    const id = setInterval(rerender, 200);
    return () => clearInterval(id);
  }, []);
  const player = use.Player();

  return (
    <Typography>
      Winner! {engine._lastUpdate} - {player.totalPlaytime}
    </Typography>
  );
}
