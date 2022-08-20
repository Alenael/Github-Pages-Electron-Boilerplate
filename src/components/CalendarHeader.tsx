import dayjs from "dayjs";
import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  return (
    <header className="my-5 mx-5 justify-start px-10 h-40 flex items-start">
      <button onClick={() => handlePrevMonth()}>
        <span className="material-symbols-outlined cursor-pointer my-5 text-white px-2">chevron_left</span>
      </button>
      <button onClick={() => handleNextMonth()}>
        <span className="material-symbols-outlined cursor-pointer my-5 text-white px-2">chevron_right</span>
      </button>
      <h2 className="text-4xl text-white font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY").toUpperCase()}
        <h2 className="text-sm font-normal">Upcoming Games</h2>
      </h2>
    </header>
  );
}

//Client ID: 3ub921vs5005dijcircgdhpdc5kwgq
//Client Secret: kt5c2605wbx7v76m42jz0mlwi69pgj
