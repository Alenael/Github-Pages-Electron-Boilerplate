import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Day from "./Day";
import WeekDaysHeader from "./WeekDaysHeader";
import { GetRecentReleases } from "../api/igdb";
import { CircularProgress, Grid, Typography } from "@mui/material";

interface IProps {
  month: dayjs.Dayjs[][];
  isMobile: boolean;
}

export default function Month({ month, isMobile }: IProps) {
  const [recentReleases, setRecentReleases] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    GetRecentReleases(month[0][0].unix(), month[4][6].unix())
      .then((releases) => {
        releases = JSON.parse(releases);
        setRecentReleases(releases);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [month]);

  return loading ? (
    <React.Fragment>
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
        <Grid item>
          <CircularProgress size={150} style={{ color: "white" }} />
        </Grid>
        <Grid item>
          <Typography variant="h3" color="white">
            Loading..
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <WeekDaysHeader isMobile={isMobile} />
      {isMobile ? (
        <div className="flex-none grid grid-cols-1">
          {month.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((day, idx) => {
                return <Day day={day} key={idx} recentReleases={recentReleases} isMobile={isMobile} />;
              })}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="flex-none grid grid-cols-7 cols-rows-6 ">
          {month.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((day, idx) => {
                return <Day day={day} key={idx} recentReleases={recentReleases} isMobile={isMobile} />;
              })}
            </React.Fragment>
          ))}
        </div>
      )}
    </React.Fragment>
  );
}
