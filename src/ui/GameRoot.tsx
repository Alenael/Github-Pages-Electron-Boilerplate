import { Typography } from "@mui/material";

import { IEngine } from "../Engine";

interface IProps {
  engine: IEngine;
}

export function GameRoot({ engine }: IProps): React.ReactElement {
  return <Typography>Winner! {engine._lastUpdate}</Typography>;
}
