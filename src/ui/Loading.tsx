import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import { Engine } from "../Engine";
import { GameRoot } from "./GameRoot";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

export function LoadingScreen(): React.ReactElement {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Engine.load();
    setLoaded(true);
  }, []);

  return (
    <StyledBox>
      {loaded ? (
        <GameRoot engine={Engine} />
      ) : (
        <Grid container direction="column" justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
          <Grid item>
            <CircularProgress size={150} color="secondary" />
          </Grid>
          <Grid item>
            <Typography variant="h3">Loading..</Typography>
          </Grid>
        </Grid>
      )}
    </StyledBox>
  );
}
