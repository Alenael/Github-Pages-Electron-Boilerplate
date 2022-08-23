import React, { useState, useContext, useEffect } from "react";
import CalendarHeader from "../../components/CalendarHeader";
import Month from "../../components/Month";
import { getMonth } from "../../utils/days";
import GlobalContext from "../../context/GlobalContext";
//import background from "../../assets/images/background.png";

export function Testing(): React.ReactElement {
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  const { monthIndex } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      <div className="h-screen bg-[url('./assets/images/background.png')]">
        {/* bg-stone-800 bg-gradient-to-t from-current to-stone-500 */}
        {/* <img src={background} className="absolute w-full h-full object-cover"></img> */}
        <div className="px-6 py-6 flex flex-col">
          <CalendarHeader />
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}
