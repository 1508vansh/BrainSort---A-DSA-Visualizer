import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NQueens() {
  const [n, setN] = useState(4);
  const [solutions, setSolutions] = useState([]);
  const [currentSolution, setCurrentSolution] = useState(0);
  const [isSolving, setIsSolving] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('dark');

  const solveNQueens = useCallback(() => {
    if (n < 1 || n > 8 || isNaN(n)) {
      setError('Please enter a number between 1 and 8!');
      return;
    }
    setError('');
    setIsSolving(true);
    const result = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));

    const isSafe = (row, col) => {
      // Check columns
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 'Q') return false;
      }
      
      // Check left diagonal
      for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 'Q') return false;
      }
      
      // Check right diagonal
      for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
        if (board[i][j] === 'Q') return false;
      }
      
      return true;
    };

    const backtrack = (row) => {
      if (row === n) {
        result.push(board.map(r => [...r]));
        return;
      }
      
      for (let col = 0; col < n; col++) {
        if (isSafe(row, col)) {
          board[row][col] = 'Q';
          backtrack(row + 1);
          board[row][col] = '.';
        }
      }
    };

    backtrack(0);
    setSolutions(result);
    setCurrentSolution(0);
    setIsSolving(false);

    if (result.length === 0) {
      setError('No solution exists for this configuration!');
    }
  }, [n]);

  useEffect(() => {
    setSolutions([]);
    setCurrentSolution(0);
    setError('');
  }, [n]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-emerald-900 to-teal-900' : 'bg-gradient-to-br from-teal-200 to-emerald-200'} text-${theme === 'dark' ? 'white' : 'black'} p-8`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center">N-Queens Visualizer</h1>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}
          >
            {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
          </button>
        </div>
        
        <div className="flex gap-4 mb-8 justify-center">
          <input
            type="number"
            value={n}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 1 && value <= 8) {
                setN(value);
                setError('');
              } else {
                setError('Please enter a number between 1 and 8!');
              }
            }}
            className={`bg-${theme === 'dark' ? 'gray-800' : 'gray-200'} px-4 py-2 rounded-lg`}
            placeholder="Enter N (1-8)"
          />
          <button
            onClick={solveNQueens}
            disabled={isSolving}
            className={`bg-teal-500 hover:bg-teal-600 px-6 py-2 rounded-lg transition-colors
              ${isSolving ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSolving ? 'Solving...' : 'Solve'}
          </button>
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {solutions.length > 0 && (
          <div className="space-y-8">
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setCurrentSolution(prev => (prev > 0 ? prev - 1 : prev))}
                disabled={currentSolution === 0}
                className={`bg-gray-700 px-4 py-2 rounded-lg
                  ${currentSolution === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Previous
              </button>
              <span className="self-center">
                Solution {currentSolution + 1} of {solutions.length}
              </span>
              <button
                onClick={() => setCurrentSolution(prev => (prev < solutions.length - 1 ? prev + 1 : prev))}
                disabled={currentSolution === solutions.length - 1}
                className={`bg-gray-700 px-4 py-2 rounded-lg
                  ${currentSolution === solutions.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Next
              </button>
            </div>

            <div className="grid place-content-center">
              <div
                className="grid gap-1"
                style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
              >
                {solutions[currentSolution]?.map((row, i) =>
                  row.map((cell, j) => (
                    <motion.div
                      key={`${i}-${j}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: (i + j) * 0.1 }}
                      className={`w-16 h-16 flex items-center justify-center
                        ${((i + j) % 2 === 0) ? 'bg-gray-200' : 'bg-gray-400'}
                        ${cell === 'Q' ? 'text-red-500' : 'text-transparent'}`}
                    >
                      ♕
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {solutions.length === 0 && !isSolving && !error && (
          <p className="text-center text-gray-400">
            Enter a value for N and click "Solve" to see solutions!
          </p>
        )}
      </div>
    </div>
  );
}