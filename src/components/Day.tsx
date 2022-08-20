import dayjs from "dayjs";
import React from "react";

interface IProps {
  day: dayjs.Dayjs;
}

export default function Day({ day }: IProps) {
  function getCurrentDayClass(): string {
    if (day.isBefore(dayjs(), "day")) return "bg-slate-600 text-white rounded-full w-7";

    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-amber-600 text-white rounded-full w-7"
      : "bg-slate-700 text-white rounded-full w-7";
  }

  return (
    <React.Fragment>
      <div className="backdrop-blur-sm bg-white bg-opacity-20 rounded-md drop-shadow-sm hover:rounded-lg mx-1 my-1 flex flex-col">
        <header className="flex flex-col items-left">
          <p className={`text-sm p-1 my-1 mx-1 text-center ${getCurrentDayClass()}`}>{day.format("DD")}</p>
        </header>
      </div>
    </React.Fragment>
  );
}
