import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";

const root = createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/higherlower-spotify" element={<App />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);
