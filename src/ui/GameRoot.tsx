import { Typography } from "@mui/material";
import React from "react";

import { IEngine } from "../Engine";

interface IProps {
  engine: IEngine;
}

export function GameRoot({ engine }: IProps): React.ReactElement {
  return <Typography>Winner! {engine._lastUpdate}</Typography>;
}
