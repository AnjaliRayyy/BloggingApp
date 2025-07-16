import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { BookOpenText, PencilLine } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] text-gray-800">
      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-10 md:px-24 py-20 gap-10">
        {/* Left */}
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Discover Stories,<br /> Share Your Voice
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Join BlogVerse – your personal space to read, write, and connect with like-minded thinkers.
          </p>
          <div className="flex gap-4">
            <Button
              variant="contained"
              size="large"
              startIcon={<PencilLine size={20} />}
              sx={{ textTransform: "none", borderRadius: "8px" }}
            >
              Start Writing
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<BookOpenText size={20} />}
              sx={{ textTransform: "none", borderRadius: "8px", color: "#1e40af", borderColor: "#1e40af" }}
            >
              Read Blogs
            </Button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="https://illustrations.popsy.co/gray/blogging.svg"
            alt="Blogging Illustration"
            className="w-[300px] md:w-[450px]"
          />
        </motion.div>
      </div>
    </div>
  );
}
