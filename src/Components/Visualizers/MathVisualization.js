import { useState,useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MathAlgorithms() {
  const [activeTab, setActiveTab] = useState('gcd');
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [factors, setFactors] = useState([]);
  const [steps, setSteps] = useState([]);
  const [gcdResult, setGcdResult] = useState(null);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('dark');

  const calculateGCD = () => {
    if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
      setError('Please enter valid numbers!');
      return;
    }
    setError('');
    let a = parseInt(num1);
    let b = parseInt(num2);
    const calculationSteps = [];
    
    while (b !== 0) {
      calculationSteps.push({ a, b });
      const temp = b;
      b = a % b;
      a = temp;
    }
    setSteps(calculationSteps);
    setGcdResult(a); // Set the GCD result
  };

  const factorize = () => {
    if (!num1 || isNaN(num1)) {
      setError('Please enter a valid number!');
      return;
    }
    setError('');
    const factors = [];
    let n = parseInt(num1);
    let divisor = 2;
    
    while (n >= 2) {
      if (n % divisor === 0) {
        factors.push(divisor);
        n = n / divisor;
      } else {
        divisor++;
      }
    }
    setFactors(factors);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 to-blue-900' : 'bg-gradient-to-br from-blue-200 to-slate-200'} text-${theme === 'dark' ? 'white' : 'black'} p-8`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center">Math Algorithms</h1>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}
          >
            {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
          </button>
        </div>

        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setActiveTab('gcd')}
            className={`px-6 py-2 rounded-lg ${
              activeTab === 'gcd' ? 'bg-cyan-500' : 'bg-gray-700'
            }`}
          >
            GCD Calculator
          </button>
          <button
            onClick={() => setActiveTab('prime')}
            className={`px-6 py-2 rounded-lg ${
              activeTab === 'prime' ? 'bg-cyan-500' : 'bg-gray-700'
            }`}
          >
            Prime Factors
          </button>
        </div>

        {activeTab === 'gcd' ? (
          <div className="space-y-6">
            <div className="flex gap-4 justify-center">
              <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                className={`bg-${theme === 'dark' ? 'gray-800' : 'gray-200'} px-4 py-2 rounded-lg`}
                placeholder="Number 1"
              />
              <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                className={`bg-${theme === 'dark' ? 'gray-800' : 'gray-200'} px-4 py-2 rounded-lg`}
                placeholder="Number 2"
              />
              <button
                onClick={calculateGCD}
                className="bg-cyan-500 px-6 py-2 rounded-lg"
              >
                Calculate GCD
              </button>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            
            <div className="grid grid-cols-3 gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`bg-${theme === 'dark' ? 'gray-800' : 'gray-200'} p-4 rounded-lg`}
                >
                  <p>Step {index + 1}:</p>
                  <p>{step.a} % {step.b} = {step.a % step.b}</p>
                </motion.div>
              ))}
            </div>

            {gcdResult !== null && (
              <div className="text-center mt-4">
                <p className="text-xl">
                  GCD: <span className="font-bold">{gcdResult}</span>
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <input
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              className={`bg-${theme === 'dark' ? 'gray-800' : 'gray-200'} px-4 py-2 rounded-lg mb-4`}
              placeholder="Enter a number"
            />
            <button
              onClick={factorize}
              className="bg-cyan-500 px-6 py-2 rounded-lg mb-4"
            >
              Factorize
            </button>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex gap-2 justify-center">
              {factors.map((factor, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-rose-500 w-12 h-12 rounded-full flex items-center justify-center"
                >
                  {factor}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}