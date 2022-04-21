import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import HeroDetails from "./pages/HeroDetails/HeroDetails";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="hero/:id" element={<HeroDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
