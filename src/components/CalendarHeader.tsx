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

  function handleReset() {
    setMonthIndex(dayjs().month());
  }

  return (
    <header className="px-4 py-2 flex items-center">
      {/* <img src="" alt="" className="mr-2 w-12 h-12" /> */}
      <h1 className="mr-10 text-xl text-amber-500 font-bold">Game Release Calendar</h1>

      <button onClick={() => handleReset()} className="border rounded py-2 px-4 mr-5">
        Today
      </button>
      <button onClick={() => handlePrevMonth()}>
        <span className="material-symbols-outlined cursor-pointer text-gray-600 mx-2">chevron_left</span>
      </button>
      <button onClick={() => handleNextMonth()}>
        <span className="material-symbols-outlined cursor-pointer text-gray-600 mx-2">chevron_right</span>
      </button>
      <h2 className="ml-4 text-xl text-grey-800 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
}