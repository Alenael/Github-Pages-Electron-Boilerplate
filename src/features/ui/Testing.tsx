import React, { useState, useContext, useEffect } from "react";
import CalendarHeader from "../../components/CalendarHeader";
import Month from "../../components/Month";
import { getMonth } from "../../utils/days";
import GlobalContext from "../../context/GlobalContext";
import background from "../../assets/background.png";

export function Testing(): React.ReactElement {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  console.table(getMonth());
  return (
    <React.Fragment>
      <div className="relative w-full h-screen bg-stone-800 bg-gradient-to-t from-current to-stone-500">
        <img src={background} className="absolute  w-full h-screen object-cover opacity-30 object-right"></img>
        <div
          // style={{ backgroundImage: `url(${background})` }}
          className="absolute  w-full h-screen flex flex-col"
        >
          <CalendarHeader />
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}
