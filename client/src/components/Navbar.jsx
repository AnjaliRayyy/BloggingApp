import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full px-6 py-4 flex justify-between items-center text-gray-800 fixed top-0 z-50 backdrop-blur-md bg-transparent"
    >
      <div className="text-2xl font-semibold tracking-tight text-blue-700">
        BlogVerse
      </div>
      <div className="hidden md:flex gap-8 text-md font-medium">
        <Link to="/" className="hover:text-blue-600 transition-colors duration-200">Home</Link>
        <Link to="/categories" className="hover:text-blue-600 transition-colors duration-200">Categories</Link>
        {/* <Link to="/about" className="hover:text-blue-600 transition-colors duration-200">About</Link> */}
        <Link to="/blog" className="hover:text-blue-600 transition-colors duration-200">Blog</Link>
        <Link to="/signup" className="hover:text-blue-600 transition-colors duration-200">Signup</Link>
      </div>
      <div className="md:hidden">
        <Menu className="text-blue-700" />
      </div>
    </motion.nav>
  );
}
