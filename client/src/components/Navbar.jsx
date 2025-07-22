import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileCategories, setShowMobileCategories] = useState(false);

  const categories = ["Tech", "Health", "Lifestyle", "Education", "Business", "Travel", "Other"];
  const dropdownContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(e.target)
      ) {
        setTimeout(() => setShowDropdown(false), 100);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full px-6 py-4 flex justify-between items-center bg-transparent text-amber-700 sticky top-0 z-50 backdrop-blur-md"
    >
      {/* Logo */}
      <Link to="/" className="text-2xl font-semibold tracking-tight text-amber-700">
        BlogVerse
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 text-md font-medium relative">
        <Link to="/" className="hover:text-amber-400 transition">Home</Link>

        <div className="relative cursor-pointer flex items-center gap-1 hover:text-amber-400" ref={dropdownContainerRef}>
          <span onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-1">
            Categories <ChevronDown size={18} />
          </span>
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: showDropdown ? 1 : 0, y: showDropdown ? 0 : -5 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-8 left-0 bg-white shadow-xl rounded-xl py-2 px-3 z-50 border border-amber-100 min-w-[160px] transition-all duration-200 ease-in-out ${
              showDropdown ? "block pointer-events-auto" : "hidden"
            }`}
          >
            {categories.map((category) => (
              <Link
                key={category}
                to={`/categories/${category}`}
                className="block py-2 px-3 text-gray-800 hover:bg-amber-100 hover:text-amber-700 rounded-md"
              >
                {category}
              </Link>
            ))}
          </motion.div>
        </div>

        <Link to="/blog" className="hover:text-amber-400 transition">Blog</Link>
        <Link to="/login" className="hover:text-amber-400 transition">Login</Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
          {showMobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg px-6 py-4 z-40 md:hidden"
          >
            <div className="flex flex-col gap-4 text-lg text-amber-800">
              <Link to="/" className="hover:text-amber-600" onClick={() => setShowMobileMenu(false)}>Home</Link>

              <div className="flex flex-col">
                <button
                  onClick={() => setShowMobileCategories(!showMobileCategories)}
                  className="flex items-center justify-between hover:text-amber-600"
                >
                  Categories <ChevronDown size={18} />
                </button>
                <AnimatePresence>
                  {showMobileCategories && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-2 ml-3 flex flex-col gap-2 overflow-hidden"
                    >
                      {categories.map((category) => (
                        <Link
                          key={category}
                          to={`/categories/${category}`}
                          onClick={() => setShowMobileMenu(false)}
                          className="text-base hover:text-amber-600"
                        >
                          {category}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/blog" className="hover:text-amber-600" onClick={() => setShowMobileMenu(false)}>Blog</Link>
              <Link to="/login" className="hover:text-amber-600" onClick={() => setShowMobileMenu(false)}>Login</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
