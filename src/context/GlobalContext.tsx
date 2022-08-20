/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setMonthIndex: (index) => {},
});

export default GlobalContext;
