import React from "react";
import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainForm from "./views/MainForm/MainForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainForm />} />
        <Route path="/questions" />
      </Routes>
    </div>
  );
}

export default App;
