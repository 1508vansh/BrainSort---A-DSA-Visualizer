import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">About BrainSorter</h3>
            <p className="text-gray-400">
              BrainSorter is a DSA visualizer designed to help you understand algorithms and data structures through interactive visualizations.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white transition-colors">
                  Algorithms
                </a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white transition-colors">
                  Data Structures
                </a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter className="h-6 w-6" />
              </a>
              <a
                href="mailto:contact@brainsorter.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaEnvelope className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Copyright Section */}
        <div className="text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} BrainSorter. All rights reserved.
          </p>
        </div>
      </div>

      {/* Back-to-Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 right-4 p-3 bg-blue-600 hover:bg-blue-500 rounded-full text-white shadow-lg transition-all"
      >
        ↑
      </button>
    </footer>
  );
}