// import { useState, useEffect, useCallback } from 'react';
// import { FaSun, FaMoon } from 'react-icons/fa';

// export default function App() {
//   const [array, setArray] = useState([]);
//   const [algorithm, setAlgorithm] = useState('linear');
//   const [searchValue, setSearchValue] = useState('');
//   const [speed, setSpeed] = useState(500);
//   const [isSearching, setIsSearching] = useState(false);
//   const [foundIndex, setFoundIndex] = useState(-1);
//   const [currentIndices, setCurrentIndices] = useState([]);
//   const [notFound, setNotFound] = useState(false);
//   const [steps, setSteps] = useState(0);
//   const [isDarkMode, setIsDarkMode] = useState(true);

//   const getActualSpeed = () => 1100 - speed;

//   const generateArray = useCallback(() => {
//     const newArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100) + 1);
//     if (algorithm === 'binary') newArray.sort((a, b) => a - b);
//     setArray(newArray);
//     resetState();
//   }, [algorithm]);

//   const resetState = () => {
//     setFoundIndex(-1);
//     setCurrentIndices([]);
//     setNotFound(false);
//     setSteps(0);
//   };

//   useEffect(() => { generateArray(); }, [generateArray]);

//   const handleSearch = async () => {
//     if (!searchValue || isSearching) return;
//     setIsSearching(true);
//     resetState();
    
//     const target = parseInt(searchValue);
//     algorithm === 'linear' ? await linearSearch(target) : await binarySearch(target);
//     setIsSearching(false);
//   };

//   const linearSearch = async (target) => {
//     for (let i = 0; i < array.length; i++) {
//       setCurrentIndices([i]);
//       setSteps(prev => prev + 1);
//       await sleep(getActualSpeed());
//       if (array[i] === target) return setFoundIndex(i);
//     }
//     setNotFound(true);
//   };

//   const binarySearch = async (target) => {
//     let left = 0, right = array.length - 1;
//     while (left <= right) {
//       const mid = Math.floor((left + right) / 2);
//       setCurrentIndices([mid]);
//       setSteps(prev => prev + 1);
//       await sleep(getActualSpeed());
//       if (array[mid] === target) return setFoundIndex(mid);
//       array[mid] < target ? left = mid + 1 : right = mid - 1;
//     }
//     setNotFound(true);
//   };

//   const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//   const toggleTheme = () => setIsDarkMode(!isDarkMode);

//   const getElementClasses = (index) => {
//     let classes = 'w-14 h-14 flex items-center justify-center rounded-lg font-bold transition-all duration-300 ';
//     if (foundIndex === index) classes += 'bg-gradient-to-br from-green-400 to-emerald-600 text-white scale-110 shadow-lg shadow-green-400/30';
//     else if (notFound) classes += 'bg-gradient-to-br from-red-400 to-rose-600 text-white scale-95';
//     else if (currentIndices.includes(index)) classes += 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white scale-125 shadow-lg shadow-cyan-400/30';
//     else classes += isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-100 hover:scale-105' : 'bg-gray-100 hover:bg-gray-200 text-gray-800 hover:scale-105';
//     return classes;
//   };

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${isDarkMode 
//       ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
//       : 'bg-gradient-to-br from-gray-100 to-gray-300'}`}>
      
//       <div className="max-w-4xl mx-auto p-4 md:p-8">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
//             Search Visualizer
//           </h1>
//           <button
//             onClick={toggleTheme}
//             className={`p-3 rounded-lg flex items-center gap-2 transition-colors ${
//               isDarkMode 
//                 ? 'bg-gray-700 hover:bg-gray-600 text-gray-100'
//                 : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
//             }`}
//           >
//             {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
//           </button>
//         </div>

//         <div className={`${isDarkMode 
//           ? 'bg-gray-800/80 border-gray-700 text-gray-100' 
//           : 'bg-white/80 border-gray-200 text-gray-800'} 
//           backdrop-blur-lg rounded-xl p-6 mb-6 shadow-2xl border`}>
          
//           <div className="flex flex-wrap gap-4 items-center mb-4">
//             <select 
//               value={algorithm}
//               onChange={(e) => setAlgorithm(e.target.value)}
//               disabled={isSearching}
//               className={`rounded-lg px-4 py-2 cursor-pointer focus:outline-none border ${
//                 isDarkMode 
//                   ? 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-cyan-400'
//                   : 'bg-white border-gray-300 focus:ring-2 focus:ring-blue-500'
//               }`}
//             >
//               <option value="linear">Linear Search</option>
//               <option value="binary">Binary Search</option>
//             </select>

//             <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
//               isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
//             }`}>
//               <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                 Speed:
//               </label>
//               <input
//                 type="range"
//                 min="100"
//                 max="1000"
//                 value={speed}
//                 onChange={(e) => setSpeed(Number(e.target.value))}
//                 disabled={isSearching}
//                 className="w-24 accent-cyan-400"
//               />
//             </div>

//             <div className={`px-4 py-2 rounded-lg border ${
//               isDarkMode 
//                 ? 'bg-cyan-400/20 border-cyan-400/30 text-cyan-400'
//                 : 'bg-cyan-500/20 border-cyan-500/30 text-cyan-600'
//             }`}>
//               Steps: <span className="font-bold">{steps}</span>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <input
//               type="number"
//               value={searchValue}
//               onChange={(e) => setSearchValue(e.target.value)}
//               placeholder="Enter a number..."
//               disabled={isSearching}
//               className={`flex-1 rounded-lg px-6 py-2 focus:outline-none border ${
//                 isDarkMode 
//                   ? 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-cyan-400'
//                   : 'bg-white border-gray-300 focus:ring-2 focus:ring-blue-500'
//               }`}
//             />
//             <button 
//               onClick={handleSearch} 
//               disabled={!searchValue || isSearching}
//               className={`px-6 py-2 rounded-lg font-medium transition-colors ${
//                 isDarkMode
//                   ? 'bg-cyan-400 text-gray-900 hover:bg-cyan-300'
//                   : 'bg-blue-500 text-white hover:bg-blue-400'
//               } disabled:opacity-50`}
//             >
//               {isSearching ? 'Searching...' : 'Search'}
//             </button>
//             <button 
//               onClick={generateArray} 
//               disabled={isSearching}
//               className={`px-6 py-2 rounded-lg transition-colors ${
//                 isDarkMode
//                   ? 'bg-purple-500 text-white hover:bg-purple-400'
//                   : 'bg-purple-400 text-white hover:bg-purple-300'
//               }`}
//             >
//               New Array
//             </button>
//           </div>
//         </div>

//         <div className={`${isDarkMode 
//           ? 'bg-gray-800/80 border-gray-700' 
//           : 'bg-white/80 border-gray-200'} 
//           backdrop-blur-lg rounded-xl p-6 shadow-2xl border`}>
          
//           <div className="flex flex-wrap gap-3 justify-center">
//             {array.map((value, index) => (
//               <div key={index} className={getElementClasses(index)}>
//                 {value}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect, useCallback } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function App() {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('linear');
  const [searchValue, setSearchValue] = useState('');
  const [speed, setSpeed] = useState(500);
  const [isSearching, setIsSearching] = useState(false);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [currentIndices, setCurrentIndices] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [steps, setSteps] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const getActualSpeed = () => 1100 - speed;

  const generateArray = useCallback(() => {
    const newArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100) + 1);
    if (algorithm === 'binary') newArray.sort((a, b) => a - b);
    setArray(newArray);
    resetState();
  }, [algorithm]);

  const resetState = () => {
    setFoundIndex(-1);
    setCurrentIndices([]);
    setNotFound(false);
    setSteps(0);
  };

  useEffect(() => { generateArray(); }, [generateArray]);

  const handleSearch = async () => {
    if (!searchValue || isSearching) return;
    setIsSearching(true);
    resetState();
    
    const target = parseInt(searchValue);
    algorithm === 'linear' ? await linearSearch(target) : await binarySearch(target);
    setIsSearching(false);
  };

  const linearSearch = async (target) => {
    for (let i = 0; i < array.length; i++) {
      setCurrentIndices([i]);
      setSteps(prev => prev + 1);
      await sleep(getActualSpeed());
      if (array[i] === target) return setFoundIndex(i);
    }
    setNotFound(true);
  };

  const binarySearch = async (target) => {
    let left = 0, right = array.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setCurrentIndices([mid]);
      setSteps(prev => prev + 1);
      await sleep(getActualSpeed());
      if (array[mid] === target) return setFoundIndex(mid);
      array[mid] < target ? left = mid + 1 : right = mid - 1;
    }
    setNotFound(true);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const getElementClasses = (index) => {
    let classes = 'w-14 h-14 flex items-center justify-center rounded-lg font-bold transition-all duration-300 ';
    if (foundIndex === index) classes += 'bg-gradient-to-br from-green-400 to-emerald-600 text-white scale-110 shadow-lg shadow-green-400/30 ';
    else if (notFound) classes += 'bg-gradient-to-br from-red-400 to-rose-600 text-white scale-95 ';
    else if (currentIndices.includes(index)) classes += 'bg-gradient-to-br from-indigo-400 to-blue-500 text-white scale-125 shadow-lg shadow-indigo-400/30 ';
    else classes += isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-100 hover:scale-105 ' : 'bg-gray-100 hover:bg-gray-200 text-gray-800 hover:scale-105 ';
    return classes;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode 
      ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
      : 'bg-gradient-to-br from-gray-100 to-gray-300'}`}>
      
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            Search Visualizer
          </h1>
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-lg flex items-center gap-2 transition-colors ${
              isDarkMode 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-indigo-400 hover:bg-indigo-500 text-gray-800'
            }`}
          >
            {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
          </button>
        </div>

        <div className={`${
          isDarkMode 
            ? 'bg-gray-800/80 border-indigo-600 text-gray-100' 
            : 'bg-white/80 border-indigo-400 text-gray-800'} 
          backdrop-blur-lg rounded-xl p-6 mb-6 shadow-2xl border-2`}>
          
          <div className="flex flex-wrap gap-4 items-center mb-4">
            <select 
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              disabled={isSearching}
              className={`rounded-lg px-4 py-2 cursor-pointer focus:outline-none border-2 ${
                isDarkMode 
                  ? 'bg-gray-700 border-indigo-600 focus:ring-2 focus:ring-indigo-400'
                  : 'bg-white border-indigo-400 focus:ring-2 focus:ring-indigo-500'
              }`}
            >
              <option value="linear">Linear Search</option>
              <option value="binary">Binary Search</option>
            </select>

            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
              isDarkMode ? 'bg-gray-700 border-indigo-600' : 'bg-white border-indigo-400'
            }`}>
              <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Speed:
              </label>
              <input
                type="range"
                min="100"
                max="1000"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                disabled={isSearching}
                className="w-24 accent-indigo-400"
              />
            </div>

            <div className={`px-4 py-2 rounded-lg border-2 ${
              isDarkMode 
                ? 'bg-indigo-600/20 border-indigo-600/30 text-indigo-400'
                : 'bg-indigo-400/20 border-indigo-500/30 text-indigo-600'
            }`}>
              Steps: <span className="font-bold">{steps}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <input
              type="number"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Enter a number..."
              disabled={isSearching}
              className={`flex-1 rounded-lg px-6 py-2 focus:outline-none border-2 ${
                isDarkMode 
                  ? 'bg-gray-700 border-indigo-600 focus:ring-2 focus:ring-indigo-400'
                  : 'bg-white border-indigo-400 focus:ring-2 focus:ring-indigo-500'
              }`}
            />
            <button 
              onClick={handleSearch} 
              disabled={!searchValue || isSearching}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                  : 'bg-indigo-500 text-white hover:bg-indigo-400'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
            <button 
              onClick={generateArray} 
              disabled={isSearching}
              className={`px-6 py-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                  : 'bg-emerald-500 text-white hover:bg-emerald-400'
              }`}
            >
              New Array
            </button>
          </div>
        </div>

        <div className={`${
          isDarkMode 
            ? 'bg-gray-800/80 border-indigo-600' 
            : 'bg-white/80 border-indigo-400'} 
          backdrop-blur-lg rounded-xl p-6 shadow-2xl border-2`}>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {array.map((value, index) => (
              <div key={index} className={getElementClasses(index)}>
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}