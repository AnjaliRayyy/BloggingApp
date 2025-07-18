import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { BookOpenText, PencilLine, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import image1 from "../images/image1.webp";
const banners = [
  {
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1400&q=80",
    title: "Welcome to BlogVerse",
    subtitle: "A community where ideas find their voice. Read inspiring stories or share your own insights with the world."
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80",
    title: "Write Freely",
    subtitle: "Express yourself without boundaries and let the world hear your story."
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
    title: "Inspire Readers",
    subtitle: "Turn your experiences into lessons that inspire thousands."
  },
  {
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1400&q=80",
    title: "Stay Curious",
    subtitle: "Explore countless stories from creators across the globe."
  },
  {
    image: "https://images.unsplash.com/photo-1532619675605-1e4b7a55aa58?auto=format&fit=crop&w=1400&q=80",
    title: "Grow Your Voice",
    subtitle: "Share ideas that matter and grow your online presence."
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    navigate("/blog");
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcefe8] to-[#e6d0c3] text-[#4a2e2b]">
      {/* Carousel Banner */}
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
        <img
          src={banners[currentSlide].image}
          alt="Banner"
          className="w-full h-full object-cover transition-all duration-500"
        />
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-center text-white px-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {banners[currentSlide].title}
          </h2>
          <p className="text-md md:text-lg max-w-2xl">
            {banners[currentSlide].subtitle}
          </p>
        </motion.div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#e2b8a0] hover:bg-[#d7a17f] text-white p-2 rounded-full"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#e2b8a0] hover:bg-[#d7a17f] text-white p-2 rounded-full"
        >
          <ChevronRight />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentSlide === index ? "bg-white" : "bg-white/50"
              }`}
            ></button>
          ))}
        </div>
      </div>

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
          <p className="text-lg text-[#6d4c41] mb-8">
            Join BlogVerse – your personal space to read, write, and connect with like-minded thinkers.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={handleClick}
              variant="contained"
              size="large"
              startIcon={<PencilLine size={20} />}
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                backgroundColor: "#a47148",
                '&:hover': { backgroundColor: "#8e5d3b" }
              }}
            >
              Start Writing
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<BookOpenText size={20} />}
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                color: "#8e5d3b",
                borderColor: "#8e5d3b",
                '&:hover': { borderColor: "#6b3f29", color: "#6b3f29" }
              }}
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
            src={image1}
            alt="Blogging Illustration"
            className="w-[300px] md:w-[450px]"
          />
        </motion.div>
      </div>
    </div>
  );
}
