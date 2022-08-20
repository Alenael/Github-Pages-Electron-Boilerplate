import dayjs from "dayjs";
import React from "react";
import Day from "./Day";
import WeekDaysHeader from "./WeekDaysHeader";

interface IProps {
  month: dayjs.Dayjs[][];
}

export default function Month({ month }: IProps) {
  return (
    <React.Fragment>
      <WeekDaysHeader />
      <div className="flex-1 grid grid-cols-7 cols-rows-6 ">
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => {
              return <Day day={day} key={idx} />;
            })}
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
}
