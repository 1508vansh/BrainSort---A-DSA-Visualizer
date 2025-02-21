import { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { FaMoon, FaSun } from "react-icons/fa";
import "../Components/DarkMode.css";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Apply dark mode class to <html> tag for better control
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Disclosure as="nav" className="bg-gray-800 dark:bg-gray-900 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          {/* Left Side - Back Arrow */}
          <button
            onClick={() => window.history.back()}
            className="text-gray-300 hover:text-white p-2 rounded-md"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>

          {/* Right Side - Dark Mode Toggle & Extra Button */}
          <div className="flex items-center space-x-4">
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full text-gray-300 hover:text-white transition-all"
            >
              {darkMode ? <FaSun className="text-yellow-400 text-xl" /> : <FaMoon className="text-gray-400 text-xl" />}
            </button>

            {/* Extra Button */}
            <button className="p-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white">
              Extra Button
            </button>

          </div>
        </div>
      </div>
    </Disclosure>
  );
}
