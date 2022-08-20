import dayjs from "dayjs";
import React from "react";
import Day from "./Day";

interface IProps {
  month: dayjs.Dayjs[][];
}

export default function Month({ month }: IProps) {
  return (
    <div className="flex-1 grid grid-cols-7 cols-rows-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => {
            return <Day day={day} key={idx} rowIdx={i} />;
          })}
        </React.Fragment>
      ))}
    </div>
  );
}
