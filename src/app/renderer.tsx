import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "../index.css";
import { store } from "./store";
import { LoadingScreen } from "../features/ui/Loading";
import { ThemeProvider } from "@material-tailwind/react";
import ContextWrapper from "../context/ContextWrapper";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

function rerender(): void {
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <ContextWrapper>
          <Provider store={store}>
            <LoadingScreen />
          </Provider>
        </ContextWrapper>
      </ThemeProvider>
    </React.StrictMode>,
  );
}
rerender();
