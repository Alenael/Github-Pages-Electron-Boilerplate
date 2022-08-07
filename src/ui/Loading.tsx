import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import { load } from "../db";
import { Engine } from "../Engine";
import { GameRoot } from "./GameRoot";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

export function LoadingScreen(): React.ReactElement {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function doLoad(): Promise<void> {
      await load()
        .then((saveString) => {
          try {
            Engine.load(saveString);
          } catch (err: unknown) {
            setLoaded(true);
            throw err;
          }
          //pushGameReady();
          setLoaded(true);
        })
        .catch((reason) => {
          console.error(reason);
          Engine.load("");
          setLoaded(true);
        });
    }
    doLoad();
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
