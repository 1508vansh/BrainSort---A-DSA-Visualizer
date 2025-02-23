import React from "react";
import { useLocation, Outlet } from "react-router";
import RunningText from "./Components/Ui/RunningText";
import "../index.css";
import "./Components/Ui/DarkMode.css";
function DSASelection() {
  const location = useLocation();
  const isHomePage = location.pathname === "/visualizer" || location.pathname === "/visualizer/";

  return (
    <>
      <div style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      {isHomePage && <RunningText />}
      <Outlet />
    </div>
    </>
  );
}

export default DSASelection;