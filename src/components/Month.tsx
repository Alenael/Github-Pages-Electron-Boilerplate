import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Day from "./Day";
import WeekDaysHeader from "./WeekDaysHeader";
import { GetRecentReleases } from "../api/igdb";

interface IProps {
  month: dayjs.Dayjs[][];
}

export default function Month({ month }: IProps) {
  const [recentReleases, setRecentReleases] = useState(null);

  useEffect(() => {
    GetRecentReleases(month[0][0].unix(), month[4][6].unix())
      .then((releases) => {
        releases = JSON.parse(releases);
        setRecentReleases(releases);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [month]);

  return (
    <React.Fragment>
      <WeekDaysHeader />
      <div className="flex-none grid grid-cols-7 cols-rows-6 ">
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => {
              return <Day day={day} key={idx} recentReleases={recentReleases} />;
            })}
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
}
