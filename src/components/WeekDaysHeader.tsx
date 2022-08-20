import dayjs from "dayjs";
import React from "react";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(localeData);

export default function WeekDaysHeader() {
  return (
    <div className="grid grid-cols-7 cols-rows-1 justify-items-center">
      <React.Fragment>
        {dayjs.weekdaysShort().map((day) => {
          return (
            <p className="text-sm w-12 leading-tight rounded-full border-black bg-white text-amber-900 text-center font-medium">
              {day.toUpperCase()}
            </p>
          );
        })}
      </React.Fragment>
    </div>
  );
}
