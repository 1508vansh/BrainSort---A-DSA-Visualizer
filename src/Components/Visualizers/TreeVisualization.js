import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export default function TreeVisualizer() {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [theme, setTheme] = useState('dark');
  const treeContainerRef = useRef(null);

  const addNode = () => {
    if (!inputValue || isNaN(inputValue)) {
      setError('Please enter a valid number!');
      return;
    }
    setError('');
    const value = parseInt(inputValue);
    const newNode = new TreeNode(value);
    if (!root) {
      setRoot(newNode);
    } else {
      let queue = [root];
      while (queue.length > 0) {
        let node = queue.shift();
        if (!node.left) {
          node.left = newNode;
          break;
        } else if (!node.right) {
          node.right = newNode;
          break;
        } else {
          queue.push(node.left, node.right);
        }
      }
    }
    setInputValue('');
  };

  const traverse = (type) => {
    const order = [];
    const algorithms = {
      inOrder: (node) => {
        if (node) {
          algorithms.inOrder(node.left);
          order.push(node.value);
          algorithms.inOrder(node.right);
        }
      },
      preOrder: (node) => {
        if (node) {
          order.push(node.value);
          algorithms.preOrder(node.left);
          algorithms.preOrder(node.right);
        }
      },
      postOrder: (node) => {
        if (node) {
          algorithms.postOrder(node.left);
          algorithms.postOrder(node.right);
          order.push(node.value);
        }
      }
    };
    algorithms[type](root);
    setTraversalOrder(order);
    setCurrentStep(0);
    animateTraversal(order);
  };

  const animateTraversal = async (order) => {
    setIsAnimating(true);
    for (let i = 0; i < order.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    setIsAnimating(false);
  };

  const RenderTree = ({ node, level = 0, position = 0 }) => {
    if (!node) return null;
    const spacing = 200 / (level + 1);

    return (
      <div className="flex flex-col items-center" 
           style={{ position: 'absolute', left: `calc(50% + ${position}px)`, top: level * 100 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`w-12 h-12 rounded-full flex items-center justify-center
            ${currentStep >= traversalOrder.indexOf(node.value) && traversalOrder.includes(node.value)
              ? 'bg-purple-500 text-white'
              : theme === 'dark' ? 'bg-gray-200 text-black' : 'bg-gray-800 text-white'}`}
        >
          {node.value}
        </motion.div>
        <div className="flex gap-8 mt-4">
          {node.left && (
            <div className="absolute left-0 right-0 h-px bg-white transform rotate-45"></div>
          )}
          <RenderTree
            node={node.left}
            level={level + 1}
            position={-spacing}
          />
          {node.right && (
            <div className="absolute left-0 right-0 h-px bg-white transform -rotate-45"></div>
          )}
          <RenderTree
            node={node.right}
            level={level + 1}
            position={spacing}
          />
        </div>
      </div>
    );
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-orange-900 to-amber-900' : 'bg-gradient-to-br from-amber-200 to-orange-200'} text-${theme === 'dark' ? 'white' : 'black'} p-8`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center">Binary Tree Visualizer</h1>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}
          >
            {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
          </button>
        </div>
        
        <div className="flex gap-4 mb-8 justify-center">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`bg-${theme === 'dark' ? 'gray-800' : 'gray-200'} px-4 py-2 rounded-lg`}
            placeholder="Enter node value"
          />
          <button
            onClick={addNode}
            className="bg-amber-500 hover:bg-amber-600 px-6 py-2 rounded-lg transition-colors"
          >
            Add Node
          </button>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex gap-4 mb-8 justify-center">
          {['preOrder', 'inOrder', 'postOrder'].map((type) => (
            <button
              key={type}
              onClick={() => traverse(type)}
              disabled={isAnimating}
              className={`bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg capitalize ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {type.replace('Order', ' Order')}
            </button>
          ))}
        </div>

        <div className="relative h-96 w-full overflow-auto border-2 border-gray-700 rounded-xl">
          <div className="relative" ref={treeContainerRef}>
            {root && <RenderTree node={root} />}
          </div>
        </div>

        <div className="mt-8 flex gap-2 justify-center">
          {traversalOrder.map((value, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: currentStep >= index ? 1.2 : 1 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center
                ${currentStep >= index ? 'bg-purple-500' : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}
            >
              {value}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}