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

  // function handleReset() {
  //   setMonthIndex(dayjs().month());
  // }

  return (
    <header className="my-5 mx-5 justify-start px-10 h-40 flex items-start">
      {/* <img src="" alt="" className="mr-2 w-12 h-12" /> */}
      {/* <h1 className="absolute left-5 top-5 text-3xl text-white font-bold">Game Release Calendar</h1> */}
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

      {/* <button onClick={() => handleReset()} className="border text-white rounded px-4">
        Today
      </button> */}
    </header>
  );
}
