import { useState, useEffect } from "react";
import { ThumbsUp, Reply } from "lucide-react";
import { motion } from "framer-motion";
import avatar from "../assets/avatar.png"; // fallback avatar

const CommentSection = ({ blogId, user }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const fetchComments = async () => {
    const res = await fetch(`http://localhost:8000/comments/${blogId}`);
    const data = await res.json();
    setComments(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const res = await fetch(`http://localhost:8000/comments/${blogId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ text: commentText }),
    });
    const data = await res.json();
    setComments(prev => [data.comment, ...prev]);
    setCommentText("");
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4 text-[#4a2e2b]">Comments</h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="flex gap-3 items-start mb-6">
        <img
          src={user?.avatar || avatar}
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-3 rounded-xl bg-[#fcefe8] border border-[#e4c1b3] text-[#4a2e2b] focus:outline-none focus:ring-2 focus:ring-[#d8a48f]"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="bg-[#d8a48f] hover:bg-[#eab8a3] text-white px-4 py-2 rounded-xl"
        >
          Comment
        </motion.button>
      </form>

      {/* List of Comments */}
      <div className="space-y-6">
        {comments.map((cmt) => (
          <motion.div
            key={cmt._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4"
          >
            <img
              src={cmt.user.avatar || avatar}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 bg-[#fffaf7] p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-[#4a2e2b]">{cmt.user.name}</span>
                <span className="text-xs text-[#a6765b]">
                  {new Date(cmt.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-[#4a2e2b]">{cmt.text}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-[#a6765b]">
                <button className="flex items-center gap-1 hover:underline">
                  <ThumbsUp size={16} /> Like
                </button>
                <button className="flex items-center gap-1 hover:underline">
                  <Reply size={16} /> Reply
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
