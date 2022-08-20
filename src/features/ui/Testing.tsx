import React, { useState, useContext, useEffect } from "react";
import CalendarHeader from "../../components/CalendarHeader";
import Month from "../../components/Month";
import { getMonth } from "../../utils/days";
import GlobalContext from "../../context/GlobalContext";

export function Testing(): React.ReactElement {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  console.table(getMonth());
  return (
    <React.Fragment>
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <Month month={currentMonth} />
      </div>
    </React.Fragment>
  );
}
