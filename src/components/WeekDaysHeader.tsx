import dayjs from "dayjs";
import React from "react";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(localeData);

interface IProps {
  isMobile: boolean;
}

export default function WeekDaysHeader({ isMobile }: IProps) {
  return isMobile ? (
    <React.Fragment></React.Fragment>
  ) : (
    <React.Fragment>
      <div className="grid grid-cols-7 cols-rows-1 justify-items-center">
        {dayjs.weekdaysShort().map((day) => {
          return (
            <p
              key={day}
              className="text-sm w-12 leading-tight rounded-full border-black bg-white text-amber-900 text-center font-medium"
            >
              {day.toUpperCase()}
            </p>
          );
        })}
      </div>
    </React.Fragment>
  );
}
