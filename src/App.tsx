import React from "react";
import "./App.scss";
import "@/shared/config/fonts/font.scss";
import { Router } from "./app/Router";

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
