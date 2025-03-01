import { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { ArrowLeftIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaMoon, FaSun } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router";
import logo from "../assets/Brain.jpg";
import "./DarkMode.css";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const navigate = useNavigate();
  const location = useLocation();
  const handleBackClick = () => {
    if (location.pathname === "/visualizer") {
        navigate("/");  // Go to Home
    } else if (location.pathname.startsWith("/visualizer/")) {
        navigate("/visualizer");  // Go back to /visualizer
    }else{
        navigate("/");  // Go to Home
    }
   };
  // Apply dark mode class to <body> tag
  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Disclosure as="nav" className="navbar shadow-lg sticky top-0 z-50" style={{ backgroundColor: "var(--nav-bg)" }}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              {/* Left Side - Mobile Menu Button, Back Arrow (Conditional), Logo, and Website Name */}
              <div className="flex items-center space-x-4">
                {/* Mobile Menu Button */}
                <div className="flex lg:hidden">
                  <Disclosure.Button className="text-gray-300 hover:text-white p-2 rounded-md transition-colors">
                    {open ? (
                      <XMarkIcon className="h-8 w-8" /> // Close icon
                    ) : (
                      <Bars3Icon className="h-8 w-8" /> // Hamburger icon
                    )}
                  </Disclosure.Button>
                </div>

                {/* Back Arrow (Conditional) */}
                {location.pathname !== "/" && ( // Show only if not on the main page
                  <button
                    onClick={() => handleBackClick()} // Navigate to previous page
                    className="text-gray-300 hover:text-white p-2 rounded-md transition-colors"
                  >
                    <ArrowLeftIcon className="h-8 w-8" /> {/* Increased size */}
                  </button>
                )}

                {/* Logo */}
                <img
                  src={logo}
                  alt="BrainSorter Logo"
                  className="h-14 w-14 rounded-full" // Increased size
                />

                {/* Website Name */}
                <span className="text-white text-4xl font-bold tracking-wider hidden lg:block">
                  BrainSorter
                </span>
              </div>

              {/* Right Side - Dark Mode Toggle & Extra Button */}
              <div className="flex items-center space-x-6">
                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full text-gray-300 hover:text-white transition-all flex items-center justify-center h-12 w-12"
                >
                  {darkMode ? (
                    <FaSun className="text-yellow-400 text-2xl" />
                  ) : (
                    <FaMoon className="text-gray-400 text-2xl" />
                  )}
                </button>

                {/* Extra Button */}
                <button onClick={()=>navigate("/RaceModeMain")} className="hidden lg:block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl">
                  Race Mode
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-2 px-4 pb-4">
              {/* Extra Button for Mobile */}
              <button onClick={()=>navigate("/RaceModeMain")} className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl">
                Race Mode
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}