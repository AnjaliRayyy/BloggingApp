import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const categories = ["Technology", "Lifestyle", "Education", "Travel", "Food"];
  const dropdownContainerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full px-6 py-4 flex justify-between items-center bg-transparent text-amber-700 sticky top-0 z-50 backdrop-blur-md "
    >
      <div className="text-2xl font-semibold tracking-tight text-amber-700">
        BlogVerse
      </div>
      <div className="hidden md:flex gap-8 text-md font-medium relative">
        <Link to="/" className="hover:text-amber-400 transition-colors duration-200">Home</Link>

        <div
          className="relative cursor-pointer flex items-center gap-1 hover:text-amber-400"
          ref={dropdownContainerRef}
        >
          <span onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-1">
            Categories <ChevronDown size={18} />
          </span>
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: showDropdown ? 1 : 0, y: showDropdown ? 0 : -5 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-8 left-0 bg-white shadow-xl rounded-xl py-2 px-3 z-50 border border-amber-100 min-w-[160px] transition-all duration-200 ease-in-out ${showDropdown ? 'block' : 'hidden'}`}
          >
            {categories.map((category) => (
              <Link
                key={category}
                to={`/categories/${category.toLowerCase()}`}
                className="block py-2 px-3 text-gray-800 hover:bg-amber-100 hover:text-amber-700 rounded-md transition-colors duration-150"
              >
                {category}
              </Link>
            ))}
          </motion.div>
        </div>

        <Link to="/blog" className="hover:text-amber-400 transition-colors duration-200">Blog</Link>
        <Link to="/login" className="hover:text-amber-400 transition-colors duration-200">Login</Link>
      </div>
      <div className="md:hidden">
        <Menu className="text-amber-700" />
      </div>
    </motion.nav>
  );
}
