import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

class TreeNode {
  constructor(value, id) {
    this.value = value;
    this.id = id;
    this.left = null;
    this.right = null;
  }
}

export default function TreeVisualizer() {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [error, setError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [theme, setTheme] = useState('dark');
  const treeContainerRef = useRef(null);
  const nextId = useRef(0);

  const addNode = () => {
    if (!inputValue || isNaN(inputValue)) {
      setError('Please enter a valid number!');
      return;
    }
    setError('');
    const value = parseInt(inputValue);
    const newNode = new TreeNode(value, nextId.current++);
    
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
          order.push({ id: node.id, value: node.value });
          algorithms.inOrder(node.right);
        }
      },
      preOrder: (node) => {
        if (node) {
          order.push({ id: node.id, value: node.value });
          algorithms.preOrder(node.left);
          algorithms.preOrder(node.right);
        }
      },
      postOrder: (node) => {
        if (node) {
          algorithms.postOrder(node.left);
          algorithms.postOrder(node.right);
          order.push({ id: node.id, value: node.value });
        }
      }
    };
    algorithms[type](root);
    setTraversalOrder(order);
    animateTraversal(order);
  };

  const animateTraversal = async (order) => {
    setIsAnimating(true);
    setCurrentStep(-1);
    for (let i = 0; i < order.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    setIsAnimating(false);
  };

  const RenderTree = ({ node, level = 0, position = 0 }) => {
    if (!node) return null;
    const spacing = 200 / (level + 1);

    return (
      <div className="flex flex-col items-center"
           style={{
             position: 'absolute',
             left: `calc(50% + ${position}px)`,
             top: `${level * 100}px`
           }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`w-12 h-12 rounded-full flex items-center justify-center
            transition-colors duration-300 ${
              traversalOrder[currentStep]?.id === node.id 
                ? 'bg-purple-500 text-white shadow-lg' 
                : theme === 'dark' 
                  ? 'bg-gray-200 text-black' 
                  : 'bg-gray-800 text-white'
            }`}
        >
          {node.value}
        </motion.div>

        <div className="flex gap-8 mt-4 relative">
          {node.left && (
            <div className={`absolute left-1/2 top-0 w-[70px] h-[3px] 
              ${theme === 'dark' ? 'bg-gray-300' : 'bg-gray-800'} 
              transform origin-right -rotate-[30deg] -translate-x-[90%] shadow-sm`}
            />
          )}
          
          <RenderTree
            node={node.left}
            level={level + 1}
            position={-spacing}
          />
          
          {node.right && (
            <div className={`absolute right-1/2 top-0 w-[70px] h-[3px] 
              ${theme === 'dark' ? 'bg-gray-300' : 'bg-gray-800'} 
              transform origin-left rotate-[30deg] translate-x-[90%] shadow-sm`}
            />
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
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === 'dark' 
      ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
      : 'bg-gradient-to-br from-gray-100 to-gray-300'} text-${theme === 'dark' ? 'white' : 'black'} p-8`}>
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
            className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} px-4 py-2 rounded-lg`}
            placeholder="Enter node value"
          />
          <button
            onClick={addNode}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg transition-colors"
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
              className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} 
                hover:bg-gray-600 px-6 py-2 rounded-lg capitalize 
                ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
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
          {traversalOrder.map(({ value }, index) => (
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