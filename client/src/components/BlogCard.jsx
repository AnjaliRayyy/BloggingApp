import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  const {
    title,
    content,
    coverImage,
    categories,
    createdAt,
    createdBy,
    slug,
  } = blog;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:bg-[#1f1f1f] dark:border-gray-700"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Cover Image */}
      <img
        src={coverImage}
        alt={title}
        className="w-full h-52 object-cover"
      />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{createdBy.username}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Preview */}
        <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
          {content}
        </p>

        {/* Read More Link */}
        <div>
          <Link
            to={`/blog/${slug}`}
            className="text-peach-600 hover:underline dark:text-peach-400 font-semibold"
          >
            Read More
          </Link>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {categories?.map((category, i) => (
            <span
              key={i}
              className="bg-peach-100 text-peach-800 text-xs font-medium px-3 py-1 rounded-full dark:bg-peach-900 dark:text-peach-200"
            >
              #{category}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Optional: define types
BlogCard.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
};
