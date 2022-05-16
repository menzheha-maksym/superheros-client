import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import HeroDetails from "./pages/HeroDetails/HeroDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddHero from "./pages/AddHero/AddHero";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:page" element={<Dashboard />} />
        <Route path="hero/:id" element={<HeroDetails />} />
        <Route path="hero/:id/edit" element={<HeroDetails />} />
        <Route path="hero/:id/update" element={<HeroDetails />} />
        <Route path="add-hero" element={<AddHero />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
