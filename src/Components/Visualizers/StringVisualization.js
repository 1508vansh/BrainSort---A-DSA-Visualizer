import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StringAlgorithms() {
  const [activeTab, setActiveTab] = useState('reverse');
  const [inputString, setInputString] = useState('');
  const [pattern, setPattern] = useState('');
  const [result, setResult] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');

  const reverseString = () => {
    if (!inputString) {
      setError('Please enter a string!');
      return;
    }
    setError('');
    setResult([...inputString].reverse());
    setCurrentStep(0);
  };

  const checkPalindrome = () => {
    if (!inputString) {
      setError('Please enter a string!');
      return;
    }
    setError('');
    const steps = [];
    let left = 0;
    let right = inputString.length - 1;
    
    while (left <= right) {
      steps.push({ left, right, match: inputString[left] === inputString[right] });
      left++;
      right--;
    }
    setResult(steps);
    animateSteps(steps.length);
  };

  const findSubstring = () => {
    if (!inputString || !pattern) {
      setError('Please enter both strings!');
      return;
    }
    setError('');
    const matches = [];
    for (let i = 0; i <= inputString.length - pattern.length; i++) {
      if (inputString.substring(i, i + pattern.length) === pattern) {
        matches.push(i);
      }
    }
    setResult(matches);
    animateSteps(matches.length);
  };

  const animateSteps = async (steps) => {
    for (let i = 0; i <= steps; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 to-pink-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 mb-8 justify-center">
          {['reverse', 'palindrome', 'substring'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg capitalize ${
                activeTab === tab ? 'bg-pink-500' : 'bg-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div className="flex gap-4 justify-center">
            <input
              value={inputString}
              onChange={(e) => setInputString(e.target.value)}
              className="bg-gray-800 px-4 py-2 rounded-lg"
              placeholder="Enter main string"
            />
            {activeTab === 'substring' && (
              <input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="bg-gray-800 px-4 py-2 rounded-lg"
                placeholder="Enter pattern"
              />
            )}
            <button
              onClick={() => {
                if (activeTab === 'reverse') reverseString();
                if (activeTab === 'palindrome') checkPalindrome();
                if (activeTab === 'substring') findSubstring();
              }}
              className="bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded-lg"
            >
              Visualize
            </button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="min-h-48">
            {activeTab === 'reverse' ? (
              <div className="flex gap-2 justify-center flex-wrap">
                {result.map((char, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800 w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                  >
                    {char}
                  </motion.div>
                ))}
              </div>
            ) : activeTab === 'palindrome' ? (
              <div className="flex gap-2 justify-center flex-wrap">
                {[...inputString].map((char, index) => {
                  const step = result.find(s => s.left === index || s.right === index);
                  const isActive = step && currentStep > result.indexOf(step);
                  const isMatch = step?.match && currentStep > result.indexOf(step);

                  return (
                    <motion.div
                      key={index}
                      animate={{
                        scale: isActive ? 1.2 : 1,
                        backgroundColor: isMatch ? '#3B82F6' : '#1F2937'
                      }}
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                    >
                      {char}
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="relative">
                <div className="flex gap-2 justify-center flex-wrap">
                  {[...inputString].map((char, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        backgroundColor: result.some(pos => 
                          index >= pos && index < pos + pattern.length
                        ) ? '#3B82F6' : '#1F2937'
                      }}
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                    >
                      {char}
                      {result.some(pos => index === pos) && (
                        <motion.div
                          initial={{ y: -20 }}
                          className="absolute text-xs -top-6"
                        >
                          Match
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}