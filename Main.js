import { motion, AnimatePresence } from "framer-motion";
import { FaBrain, FaTrophy, FaArrowRight, FaRocket, FaChartLine, FaBookOpen } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function Main() {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const cards = [
    {
      title: "DSA Visualizer",
      icon: <FaBrain className="h-16 w-16" />,
      description: "Explore algorithms and data structures through interactive visualizations",
      link: "/visualizer",
      color: "from-blue-600 to-purple-600"
    },
    {
      title: "Race Mode (Coming Soon)",
      icon: <FaTrophy className="h-16 w-16" />,
      description: "Compete with others in real-time coding challenges",
      link: "/rush",
      color: "from-emerald-600 to-cyan-600"
    }
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex-1 relative overflow-hidden" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500 rounded-full blur-sm"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              scale: 0
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">BrainSorter</span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Master Data Structures and Algorithms through interactive visualizations and competitive coding challenges
          </motion.p>
        </motion.div>

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className={`bg-gradient-to-r ${card.color} rounded-2xl p-8 h-64 shadow-xl relative overflow-hidden transition-all hover:shadow-2xl`}>
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                <div className="flex flex-col h-full justify-between relative">
                  <div className="text-white">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      {card.icon}
                    </motion.div>
                    <h2 className="text-3xl font-bold mt-4">
                      {card.title.includes("Coming Soon") ? (
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="inline-block"
                        >
                          {card.title}
                        </motion.span>
                      ) : (
                        card.title
                      )}
                    </h2>
                    <p className="text-lg mt-2 opacity-90">{card.description}</p>
                  </div>
                  
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center rounded-2xl"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(card.link)}
                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
                      >
                        <span className="text-lg font-semibold">
                          {"Get Started"}
                        </span>
                        <motion.span
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <FaArrowRight className="h-5 w-5" />
                        </motion.span>
                      </motion.button>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          {[
            { title: "Interactive Learning", text: "Step-by-step algorithm visualization", icon: <FaBookOpen /> },
            { title: "Advanced Data-Structures", text: "Supports Graph, Dp, and Many More", icon: <FaRocket /> },
            { title: "Progress Tracking", text: "Monitor your learning journey", icon: <FaChartLine /> }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="card p-6 rounded-2xl shadow-lg relative overflow-hidden"
              style={{ backgroundColor: "var(--card-bg)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="h-32 flex flex-col justify-center relative">
                <motion.div
                  className="text-3xl mb-4"
                  style={{ color: "var(--text-color)" }}
                  whileHover={{ scale: 1.1 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold" style={{ color: "var(--text-color)" }}>
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm" style={{ color: "var(--text-color)" }}>
                  {feature.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Scroll Prompt */}
        {isMounted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center mt-16"
          >
            <div className="inline-flex flex-col items-center">
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-sm opacity-75"
              >
                Scroll Down
              </motion.div>
              <div className="w-px h-16 bg-current mt-2 opacity-50" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
