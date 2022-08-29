import React, { useState, useContext, useEffect } from "react";
import CalendarHeader from "../../components/CalendarHeader";
import Month from "../../components/Month";
import { getMonth } from "../../utils/days";
import GlobalContext from "../../context/GlobalContext";
//import background from "../../assets/images/background.png";

export function Testing(): React.ReactElement {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const { monthIndex } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => window.removeEventListener("resize", handleWindowSizeChange);
  }, []);

  function handleWindowSizeChange() {
    setIsMobile(window.innerWidth <= 768);
  }

  return (
    <React.Fragment>
      <div className="bg-[url('./assets/images/background.png')] bg-cover bg-fixed">
        <div className="px-6 py-6 flex flex-col">
          <CalendarHeader />
          <Month month={currentMonth} isMobile={isMobile} />
        </div>
      </div>
    </React.Fragment>
  );
}
