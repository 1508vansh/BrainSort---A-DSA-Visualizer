import React, { useEffect, useState } from "react";
import { FaSort, FaSearch, FaProjectDiagram, FaBrain, FaChartLine, FaPuzzlePiece, FaTree, FaCalculator, FaFont } from "react-icons/fa";
import image1 from "../assets/Selection_of_minrun_by_timsort.svg.png";
import image2 from "../assets/dynamic.png";
import image3 from "../assets/backtracking.png";
import image4 from "../assets/greedy.avif";
import image5 from "../assets/1726894191969.png";
import image6 from "../assets/1_eTQoIHGdG58sy-iMwcp97w.png";
import image7 from "../assets/1_EEmpU5oXP-iLual-5u9aFA.png";
import image8 from "../assets/Greedy_algorithm_36_cents.svg";
import image9 from "../assets/what-is-graphs-in-data-structure.avif";
// import "./DarkMode.css";

const algorithmCategories = [
  { name: "Sorting Algorithms", icon: <FaSort />, path: "/visualizer/sorting", borderColor: "border-blue-500", bgColor: "bg-blue-500", image: image1 },
  { name: "Searching Algorithms", icon: <FaSearch />, path: "/visualizer/searching", borderColor: "border-green-500", bgColor: "bg-green-500", image: image6 },
  { name: "Graph Algorithms", icon: <FaProjectDiagram />, path: "/visualizer/graph", borderColor: "border-purple-500", bgColor: "bg-purple-500", image: image9 },
  { name: "Dynamic Programming", icon: <FaBrain />, path: "/visualizer/dp", borderColor: "border-red-500", bgColor: "bg-red-500", image: image2 },
  { name: "Greedy Algorithms", icon: <FaChartLine />, path: "/visualizer/greedy", borderColor: "border-yellow-500", bgColor: "bg-yellow-500", image: image4 },
  { name: "Backtracking", icon: <FaPuzzlePiece />, path: "/visualizer/backtracking", borderColor: "border-gray-500", bgColor: "bg-gray-600", image: image3 },
  { name: "Tree Algorithms", icon: <FaTree />, path: "/visualizer/tree", borderColor: "border-teal-500", bgColor: "bg-teal-500", image: image5 },
  { name: "Mathematical Algorithms", icon: <FaCalculator />, path: "/visualizer/math", borderColor: "border-indigo-500", bgColor: "bg-indigo-500", image: image8 },
  { name: "String Algorithms", icon: <FaFont />, path: "/visualizer/string", borderColor: "border-pink-500", bgColor: "bg-pink-500", image: image7 },
];

export default function AlgorithmCards() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(localStorage.getItem("theme") === "dark");
  }, []);

  return (
    <div className={`container mx-auto px-4 py-12 ${darkMode ? "dark-mode" : ""}`}>
      <h2 className="text-4xl font-bold text-center mb-12 text-white-800 dark:text-red-100">
        Explore Algorithm Categories
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6">
        {algorithmCategories.map((algo, index) => (
          <div
            key={index}
            className={`group relative rounded-2xl p-6 flex flex-col items-center cursor-pointer
              transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] 
              border border-gray-200 dark:border-gray-700 border-t-4 ${algo.borderColor}
              bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl
              hover:-translate-y-1.5 active:translate-y-0`}
            onClick={() => (window.location.href = algo.path)}
          >
            {/* Icon Container */}
            <div className={`p-4 rounded-2xl ${algo.bgColor} text-white mb-6 
              transition-colors group-hover:rounded-xl`}>
              <div className="text-4xl transform group-hover:scale-110 transition-transform">
                {algo.icon}
              </div>
            </div>

            {/* Enhanced Image Container */}
            <div className="w-full aspect-video mb-6 rounded-xl overflow-hidden border-2 border-gray-100 
              dark:border-gray-700 shadow-sm relative bg-gray-100 dark:bg-gray-700">
              <div className={`absolute inset-0 bg-gradient-to-t ${algo.bgColor.replace('bg', 'from')}/30 to-transparent z-10`} />
              <img
                src={algo.image}
                alt={algo.name}
                className="w-full h-full object-cover object-center transform transition-transform 
                  duration-300 group-hover:scale-105 absolute inset-0"
                style={{
                  ...(algo.image === image8 && { objectFit: 'contain', padding: '8px' }),
                  ...([image2, image3, image4].includes(algo.image) && { objectPosition: 'top center' })
                }}
              />
            </div>

            {/* Text Content */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {algo.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Click to visualize →
              </p>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/5 
              transition-all duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}