import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

const RaceEntryUI = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  const carVariants = {
    hidden: { x: '-100%' },
    visible: { x: '100%', transition: { duration: 2, ease: 'linear', repeat: Infinity } },
  };

  const buttonVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { type: 'spring', stiffness: 300, delay: 1 } },
  };

  const emojiVariants = {
    float: {
      y: [0, -20, 0],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Pulsating Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-gray-900 animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Background Animation - Racing Cars */}
      <motion.div
        className="absolute w-full h-full overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-10 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg shadow-lg"
            variants={carVariants}
            style={{ top: `${(i + 1) * 15}%` }}
          />
        ))}
      </motion.div>

      {/* Animated Track Lines */}
      <motion.div
        className="absolute w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-1 bg-white/10"
            style={{ top: `${(i + 1) * 20}%` }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </motion.div>

      {/* Floating Emojis */}
      <motion.div
        className="absolute w-full h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {['🏎️', '🚀', '⚡', '🌟'].map((emoji, i) => (
          <motion.span
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
            }}
            variants={emojiVariants}
            animate="float"
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-4"
          variants={textVariants}
        >
          Algorithm Race
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl text-cyan-100 font-light mb-8"
          variants={textVariants}
        >
          Witness the ultimate speed comparison of algorithms!
        </motion.p>

        {/* Get Started Button */}
        <motion.button
          onClick={() => navigate('/RaceMode')} // Navigate to RaceMode
          className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl text-xl font-bold text-white transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/30 active:scale-95 relative overflow-hidden"
          variants={buttonVariants}
        >
          <span className="relative z-10">Get Started</span>
          {/* Glowing Effect */}
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 hover:opacity-50 blur-md transition-opacity"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.5 }}
          />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default RaceEntryUI;