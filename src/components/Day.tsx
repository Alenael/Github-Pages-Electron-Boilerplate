import dayjs from "dayjs";
import React from "react";

interface IProps {
  day: dayjs.Dayjs;
  rowIdx: number;
}

export default function Day({ day, rowIdx }: IProps) {
  function getCurrentDayClass(): string {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "bg-amber-600 text-white rounded-full w-7" : "";
  }

  return (
    <div className="border border-amber-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>}

        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>{day.format("DD")}</p>
      </header>
    </div>
  );
}
