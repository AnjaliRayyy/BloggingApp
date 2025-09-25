import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentForm, setCommentForm] = useState({ name: "", comment: "" });
const [isSubmitting, setIsSubmitting] = useState(false);


const handleCommentSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blog/${slug}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentForm),
    });
    const data = await res.json();

    if (res.ok) {
      setBlog((prev) => ({
        ...prev,
        comments: [...prev.comments, commentForm],
      }));
      setCommentForm({ name: "", comment: "" });
      toast.success("Comment added!");
    } else {
      toast.error(data.msg);
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to post comment.");
  } finally {
    setIsSubmitting(false);
  }
};


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blog/${slug}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setBlog(data);
        else setError(data.msg);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
        setError("Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-rose-50 dark:bg-neutral-900">
        <p className="text-lg font-medium text-brown-700 dark:text-rose-100 animate-pulse">
          Loading blog...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#fcefe8] to-[#e6d0c3] dark:from-[#3c2b28] dark:to-[#5b3d3a] text-[#4a2e2b] dark:text-[#fbeee0] px-4 text-center"
      >
        {/* <FaExclamationTriangle className="text-[#9b2c2c] dark:text-[#fbd5d5] text-6xl mb-6 animate-bounce" /> */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-lg mb-6 max-w-md">
          {error || "We couldn't load the blog you're looking for."}
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#d98f6a] hover:bg-[#c0785b] text-white px-6 py-2 rounded-md shadow transition"
        >
          Go to Homepage
        </button>
      </motion.div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#fcefe8] to-[#e6d0c3] text-[#4a2e2b] dark:bg-neutral-900">
        <p className="text-red-500">Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcefe8] to-[#e6d0c3] text-[#4a2e2b] py-10 px-4 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-lg rounded-xl shadow-xl p-6 md:p-10 text-[#4a2e2b]"
      >
        <img
          src={blog.coverPageUrl}
          alt="Cover"
          className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md mb-6"
        />

        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#4a2e2b]">
          {blog.title}
        </h1>

        <div className="text-sm text-[#4a2e2b] mb-6">
          <p>
            By <span className="font-semibold">{blog.createdBy.username}</span>
          </p>
          <p>Published on {new Date(blog.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="prose prose-lg max-w-full text-justify">
          <p>{blog.content}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {blog.category && (
            <span className="bg-[#e2b8a0] text-[#4a2e2b] px-3 py-1 rounded-full text-sm">
              #{blog.category}
            </span>
          )}
        </div>

        <div className="h-1 bg-amber-950 w-[100%] mt-8 rounded-3xl"></div>

        {/* <---------------Comment Section-------------> */}
        <div className="mt-12">
  <h2 className="text-2xl font-semibold mb-4 text-[#4a2e2b]">💬 Comments</h2>

  {/* Comment Form */}
  <form onSubmit={handleCommentSubmit} className="space-y-4 mb-8">
    <input
      type="text"
      name="name"
      required
      value={commentForm.name}
      onChange={(e) =>
        setCommentForm({ ...commentForm, name: e.target.value })
      }
      placeholder="Your Name"
      className="w-full px-4 py-2 border rounded-md bg-[#fff9f6] text-[#4a2e2b]"
    />
    <textarea
      name="comment"
      required
      rows="3"
      value={commentForm.comment}
      onChange={(e) =>
        setCommentForm({ ...commentForm, comment: e.target.value })
      }
      placeholder="Your Comment..."
      className="w-full px-4 py-2 border rounded-md bg-[#fff9f6] text-[#4a2e2b]"
    />
    <motion.button
      type="submit"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      disabled={isSubmitting}
      className="bg-[#d88f74] text-white px-6 py-2 rounded-md hover:bg-[#c97c60] transition"
    >
      {isSubmitting ? "Posting..." : "Post Comment"}
    </motion.button>
  </form>

  {/* Display Comments */}
  <div className="space-y-4">
    {blog.comments?.length > 0 ? (
      blog.comments.map((c, i) => (
        <div
          key={i}
          className="bg-white/60 backdrop-blur-sm p-4 rounded-md shadow-md"
        >
          <p className="font-semibold text-[#4a2e2b]">{c.name}</p>
          <p className="text-sm text-[#4a2e2b]">{c.comment}</p>
          <p className="text-xs text-gray-500">
            {new Date(c.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))
    ) : (
      <p className="text-gray-500 italic">No comments yet.</p>
    )}
  </div>
</div>

      </motion.div>
    </div>
  );
};

export default BlogDetail;
