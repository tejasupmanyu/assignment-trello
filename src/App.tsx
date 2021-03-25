import * as React from "react";
import { Board } from "./molecules/board";
import { Header } from "./molecules/header";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Board />
    </div>
  );
}

export default App;
