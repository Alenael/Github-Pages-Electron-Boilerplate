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
      <div className="bg-[url('./assets/images/background.png')] bg-cover bg-fixed">
        <div className="px-6 py-6 flex flex-col">
          <CalendarHeader />
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}
