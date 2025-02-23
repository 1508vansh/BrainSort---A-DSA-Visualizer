import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./src/Components/Ui/Navbar";
import Footer from "./src/Components/Ui/DSAVisuFooter";
import Main from "./Main";
import AlgorithmCards from "./src/Components/Ui/AlgorithmCards";
import SortingVisualizer from "./src/Components/Visualizers/SortingVisualizer";
import SearchingVisualizer from "./src/Components/Visualizers/SearchingVisualizer";
import GraphVisualizer from "./src/Components/Visualizers/GraphVisualizer";
import FibonacciVisualizer from "./src/Components/Visualizers/FibbonacciVisualizer";
import StringAlgorithms from "./src/Components/Visualizers/StringVisualization";
import MathAlgorithms from "./src/Components/Visualizers/MathVisualization";
import BacktrackingAlgorithms from "./src/Components/Visualizers/Backtracking";
import GreedyAlgorithms from "./src/Components/Visualizers/GreedyVisualization";
import TreeVisualizer from "./src/Components/Visualizers/TreeVisualization";
import DSASelection from "./src/DSASelection";
import RushMode from "./src/RushMode";
import "./src/Components/Ui/DarkMode.css";
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/visualizer" element={<DSASelection />}>
            <Route index element={<AlgorithmCards />} />
            <Route path="sorting" element={<SortingVisualizer />} />
            <Route path="searching" element={<SearchingVisualizer />} />
            <Route path="graph" element={<GraphVisualizer />} />
            <Route path="dp" element={<FibonacciVisualizer />} />
            <Route path="string" element={<StringAlgorithms />} />
            <Route path="math" element={<MathAlgorithms />} />
            <Route path="backtracking" element={<BacktrackingAlgorithms />} />
            <Route path="greedy" element={<GreedyAlgorithms />} />
            <Route path="tree" element={<TreeVisualizer />} />
          </Route>
          <Route path="/rush" element={<RushMode />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);