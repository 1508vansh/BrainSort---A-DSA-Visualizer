import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Navbar from "./Components/Navbar";
import RunningText from "./Components/RunningText";
import AlgorithmCards from "./Components/AlgorithmCards";
import SortingVisualizer from "./Components/visualizers/SortingVisualizer"; // Example visualizer
import SearchingVisualizer from "./Components/Visualizers/SearchingVisualizer";
import GraphVisualizer from "./Components/Visualizers/GraphVisualizer";
import "../index.css";

function DSASelection() {
  return (
    <Router>
      <Navbar />
      <RunningText />
      <Routes>
        <Route path="/" element={<AlgorithmCards />} />
        <Route path="/visualize/sorting" element={<SortingVisualizer />} />
        <Route path="/visualize/searching" element={<SearchingVisualizer/>}/>
        <Route path="/visualize/graph" element={<GraphVisualizer />} />
        {/* Add more routes for other algorithms */}
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<DSASelection />);
