import React from "react";
import "../styles/index.css";

function App() {
  return (
    <div className="App flex h-[100vh] flex-col items-center justify-center bg-[#eee]">
      <h1 className="text-4xl font-bold text-[#333]">Hi 👋, Tailwind test.</h1>
      <p className="font-italic m-[3px] text-sm">
        Now you can use <code className="bg-[#ccc] p-[3px]">[]</code> to style your apps!
      </p>
    </div>
  );
}

//export default hot(module)(App);
export default App;
