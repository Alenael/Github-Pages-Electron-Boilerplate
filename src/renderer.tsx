import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "../src/styles/index.css";
import { store } from "./store";
import { LoadingScreen } from "./ui/Loading";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

function rerender(): void {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <LoadingScreen />
      </Provider>
    </React.StrictMode>,
  );
}
rerender();
