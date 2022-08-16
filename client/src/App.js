import React from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import FlightPage from "./components/FlightPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/flightPage" element={<FlightPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
