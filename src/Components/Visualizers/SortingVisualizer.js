import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const SortingVisualizer = () => {
  const [algorithm, setAlgorithm] = useState("bubble-sort");
  const [arrayInput, setArrayInput] = useState("");
  const [sortingSteps, setSortingSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [hasSorted, setHasSorted] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonData, setComparisonData] = useState([]);
  const [inputRange, setInputRange] = useState(10); // Progressive range for comparison
  const [darkTheme, setDarkTheme] = useState(false);

  const comparisonChartRef = useRef(null); // Ref for scrolling to the comparison chart

  useEffect(() => {
    if (isSorting && currentStep < sortingSteps.length - 1) {
      const timeout = setTimeout(() => setCurrentStep((prev) => prev + 1), 300);
      return () => clearTimeout(timeout);
    } else {
      setIsSorting(false);
    }
  }, [currentStep, isSorting, sortingSteps]);

  const parseArray = (input) => {
    return input
      .split(",")
      .map((num) => Number(num.trim()))
      .filter((num) => !isNaN(num));
  };

  const generateRandomArray = (size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
  };

  const handleSort = () => {
    const arr = parseArray(arrayInput);
    if (arr.length === 0) return;

    let steps = [];
    switch (algorithm) {
      case "bubble-sort":
        bubbleSort([...arr], steps);
        break;
      case "insertion-sort":
        insertionSort([...arr], steps);
        break;
      case "selection-sort":
        selectionSort([...arr], steps);
        break;
      case "merge-sort":
        mergeSort([...arr], steps);
        break;
      case "quick-sort":
        quickSort([...arr], 0, arr.length - 1, steps);
        break;
      default:
        break;
    }

    setSortingSteps(steps);
    setCurrentStep(0);
    setIsSorting(true);
    setHasSorted(true);
  };

  const handleCompare = () => {
    const algorithms = [
      "bubble-sort",
      "insertion-sort",
      "selection-sort",
      "merge-sort",
      "quick-sort",
    ];

    const data = [];
    algorithms.forEach((algo) => {
      const arr = generateRandomArray(inputRange); // Use progressive range for comparison
      const steps = [];
      switch (algo) {
        case "bubble-sort":
          bubbleSort([...arr], steps);
          break;
        case "insertion-sort":
          insertionSort([...arr], steps);
          break;
        case "selection-sort":
          selectionSort([...arr], steps);
          break;
        case "merge-sort":
          mergeSort([...arr], steps);
          break;
        case "quick-sort":
          quickSort([...arr], 0, arr.length - 1, steps);
          break;
        default:
          break;
      }
      data.push({
        algorithm: algo,
        steps: steps.length,
      });
    });

    setComparisonData(data);
    setShowComparison(true);

    // Scroll to the comparison chart
    if (comparisonChartRef.current) {
      comparisonChartRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const clearInput = () => {
    setArrayInput("");
    setSortingSteps([]);
    setCurrentStep(0);
    setIsSorting(false);
    setHasSorted(false);
    setShowComparison(false);
  };

  // Sorting algorithms with improved step capturing
  const bubbleSort = (arr, steps) => {
    steps.push([...arr]);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          steps.push([...arr]);
        }
      }
    }
  };

  const insertionSort = (arr, steps) => {
    steps.push([...arr]);
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        steps.push([...arr]);
        j--;
      }
      arr[j + 1] = key;
      steps.push([...arr]);
    }
  };

  const selectionSort = (arr, steps) => {
    steps.push([...arr]);
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
        // Log each inner-loop comparison to capture the full work done
        steps.push([...arr]);
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        steps.push([...arr]);
      }
    }
  };

  const mergeSort = (arr, steps) => {
    const merge = (left, right) => {
      let result = [];
      let i = 0,
        j = 0;

      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          result.push(left[i++]);
        } else {
          result.push(right[j++]);
        }
      }

      return result.concat(left.slice(i)).concat(right.slice(j));
    };

    const sort = (arr) => {
      if (arr.length <= 1) return arr;

      const mid = Math.floor(arr.length / 2);
      const left = sort(arr.slice(0, mid));
      const right = sort(arr.slice(mid));
      const merged = merge(left, right);

      steps.push([...merged]);
      return merged;
    };

    return sort(arr);
  };

  const quickSort = (arr, left, right, steps) => {
    if (left >= right) return;

    let pivot = arr[right];
    let i = left;
    for (let j = left; j < right; j++) {
      if (arr[j] < pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push([...arr]);
        i++;
      }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]];
    steps.push([...arr]);

    quickSort(arr, left, i - 1, steps);
    quickSort(arr, i + 1, right, steps);
  };

  return (
    <div className={`p-6 space-y-8 max-w-6xl mx-auto ${darkTheme ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className="flex justify-between items-center">
        <h1 className={`text-4xl font-bold text-center mb-6 ${darkTheme ? "text-gray-200" : "text-gray-800"}`}>
          Sorting Algorithm Visualizer
        </h1>
        <button
          onClick={() => setDarkTheme((prev) => !prev)}
          className={`px-4 py-2 rounded ${darkTheme ? "bg-gray-700 text-gray-200" : "bg-gray-300 text-gray-800"}`}
        >
          {darkTheme ? "Light Theme" : "Dark Theme"}
        </button>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <select
          className={`border p-3 rounded-lg shadow-md w-64 ${darkTheme ? "bg-gray-700 text-gray-200" : "bg-white text-gray-800"}`}
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="bubble-sort">Bubble Sort</option>
          <option value="insertion-sort">Insertion Sort</option>
          <option value="selection-sort">Selection Sort</option>
          <option value="merge-sort">Merge Sort</option>
          <option value="quick-sort">Quick Sort</option>
        </select>

        <input
          type="text"
          className={`border p-3 rounded-lg shadow-md text-lg w-full md:w-96 ${darkTheme ? "bg-gray-700 text-gray-200" : "bg-white text-gray-700"}`}
          placeholder="Enter numbers separated by commas (e.g., 5, 3, 8, 1)"
          value={arrayInput}
          onChange={(e) => setArrayInput(e.target.value)}
        />

        <div className="flex space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition-all"
            onClick={handleSort}
            disabled={isSorting}
          >
            {isSorting ? "Sorting..." : "Start Sorting"}
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow-md transition-all"
            onClick={clearInput}
          >
            Clear
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition-all"
            onClick={handleCompare}
          >
            Compare Algorithms
          </button>
        </div>

        {/* Progressive Range Selector */}
        <div className="flex flex-col items-center space-y-2">
          <label className={`font-semibold ${darkTheme ? "text-gray-200" : "text-gray-700"}`}>
            Select Input Size for Comparison:
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={inputRange}
            onChange={(e) => setInputRange(Number(e.target.value))}
            className="w-64"
          />
          <span className={`${darkTheme ? "text-gray-200" : "text-gray-700"}`}>{inputRange} elements</span>
        </div>
      </div>

      <div className="space-y-8">
        <div className={`p-6 rounded-xl shadow-lg ${darkTheme ? "bg-gray-800" : "bg-white"}`}>
          <h2 className={`text-2xl font-semibold mb-4 ${darkTheme ? "text-gray-200" : "text-gray-700"}`}>
            Sorting Visualization
          </h2>
          <div className={`flex justify-center items-end h-64 rounded-lg p-4 overflow-x-auto ${darkTheme ? "bg-gray-700" : "bg-gray-50"}`}>
            {sortingSteps.length > 0 &&
              sortingSteps[currentStep].map((num, idx) => (
                <div
                  key={idx}
                  className="mx-1 flex justify-center items-end rounded-t-md transition-all duration-300 ease-out"
                  style={{
                    backgroundColor: "#3B82F6",
                    width: `${Math.max(20, 80 / sortingSteps[0].length)}px`,
                    height: `${Math.abs(num) * 10}px`,
                  }}
                >
                  <span className={`text-xs mb-1 ${darkTheme ? "text-gray-200" : "text-white"}`}>
                    {num}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {hasSorted && !isSorting && (
          <div className={`p-6 rounded-xl shadow-lg ${darkTheme ? "bg-gray-800" : "bg-green-50"}`}>
            <h3 className={`text-2xl font-semibold mb-4 ${darkTheme ? "text-gray-200" : "text-gray-700"}`}>
              Sorted Result
            </h3>
            <div className="flex flex-wrap gap-2">
              {sortingSteps[sortingSteps.length - 1]?.map((num, idx) => (
                <span
                  key={idx}
                  className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        )}

        {showComparison && (
          <div ref={comparisonChartRef} className={`p-6 rounded-xl shadow-lg ${darkTheme ? "bg-gray-800" : "bg-white"}`}>
            <h2 className={`text-2xl font-semibold mb-4 ${darkTheme ? "text-gray-200" : "text-gray-700"}`}>
              Algorithm Comparison
            </h2>
            <Bar
              data={{
                labels: comparisonData.map((d) => d.algorithm.replace("-", " ").toUpperCase()),
                datasets: [
                  {
                    label: "Number of Steps",
                    data: comparisonData.map((d) => d.steps),
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(255, 206, 86, 0.6)",
                      "rgba(75, 192, 192, 0.6)",
                      "rgba(153, 102, 255, 0.6)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                    ],
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: {
                    display: true,
                    text: "Steps Required for Sorting",
                    color: darkTheme ? "#E5E7EB" : "#1F2937",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      text: "Steps",
                      display: true,
                      color: darkTheme ? "#E5E7EB" : "#1F2937",
                    },
                    ticks: {
                      color: darkTheme ? "#E5E7EB" : "#1F2937",
                    },
                  },
                  x: {
                    ticks: {
                      color: darkTheme ? "#E5E7EB" : "#1F2937",
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SortingVisualizer;
