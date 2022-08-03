import React from "react";
import ReactDOM from "react-dom/client";

import "../src/styles/index.css";
import { LoadingScreen } from "./ui/Loading";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
function rerender(): void {
  root.render(
    <React.StrictMode>
      <LoadingScreen />
    </React.StrictMode>,
  );
}
rerender();
