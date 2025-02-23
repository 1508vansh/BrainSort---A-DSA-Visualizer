// Create a new file: InteractiveTerminal.jsx
import { motion } from "framer-motion";

export default function InteractiveTerminal() {
  return (
    <motion.div
      className="h-64 bg-gray-800 rounded-lg p-4 font-mono text-green-400 overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-sm">
        <p className="text-green-400">$ Welcome to BrainSorter Terminal</p>
        <p className="text-gray-400">$ Loading interactive environment...</p>
        <p className="text-gray-400">$ Initializing code editor...</p>
        <p className="text-gray-400">$ Connecting to live preview...</p>
        <p className="text-green-400">$ Ready for interactive coding!</p>
      </div>
      <div className="mt-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}