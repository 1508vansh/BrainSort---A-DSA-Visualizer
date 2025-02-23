import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GreedyVisualizer() {
  const [amount, setAmount] = useState('');
  const [coins, setCoins] = useState([25, 10, 5, 1]);
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');

  const calculateCoins = () => {
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid amount!');
      return;
    }
    setError('');
    let remaining = parseFloat(amount);
    const selected = [];
    for (const coin of coins.sort((a, b) => b - a)) {
      while (remaining >= coin) {
        selected.push(coin);
        remaining = parseFloat((remaining - coin).toFixed(2));
      }
    }
    setResult(selected);
  };

  const clearAll = () => {
    setAmount('');
    setResult([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Coin Change Visualizer</h1>
        
        <div className="flex flex-col gap-4 mb-8 items-center">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-gray-800 px-4 py-2 rounded-lg text-white w-full max-w-xs"
            placeholder="Enter amount (e.g., 47)"
            step="0.01"
          />
          <div className="flex gap-4">
            <button
              onClick={calculateCoins}
              className="bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-lg transition-all"
            >
              Calculate Change
            </button>
            <button
              onClick={clearAll}
              className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg transition-all"
            >
              Clear
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div className="grid grid-cols-8 gap-4 min-h-48 p-4 bg-gray-800/50 rounded-lg">
          <AnimatePresence>
            {result.map((coin, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-amber-400 w-12 h-12 rounded-full flex items-center justify-center shadow-lg text-black font-bold"
              >
                ${coin}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg">
            Total Coins Used: <span className="font-bold">{result.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
}