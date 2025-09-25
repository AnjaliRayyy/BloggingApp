import { useEffect, useState } from "react";
import { SendHorizontal, ThumbsUp, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CommentSection({ blogId, user }) {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [replyInput, setReplyInput] = useState({});
  
  const fetchComments = async () => {
    const res = await fetch(`http://localhost:8000/comments/blog/${blogId}`);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const handleCommentSubmit = async () => {
    const res = await fetch("http://localhost:8000/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ blogId, text: input }),
    });
    if (res.ok) {
      setInput("");
      fetchComments();
    }
  };

  const handleReplySubmit = async (commentId) => {
    const res = await fetch(`http://localhost:8000/comments/${commentId}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ text: replyInput[commentId] }),
    });
    if (res.ok) {
      setReplyInput((prev) => ({ ...prev, [commentId]: "" }));
      fetchComments();
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4 text-[#4a2e2b]">Comments</h2>

      <div className="flex items-start gap-4 mb-6">
        <img
          src={user.profilePic}
          alt="DP"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 space-y-2">
          <textarea
            placeholder="Write a comment..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border border-peach-300 rounded-lg p-3 bg-white dark:bg-neutral-800 text-[#4a2e2b]"
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-peach-500 text-white px-4 py-1 rounded-md hover:bg-peach-600"
          >
            <SendHorizontal size={18} />
          </button>
        </div>
      </div>

      {comments.map((comment) => (
        <motion.div
          key={comment._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-white/60 rounded-xl shadow-md"
        >
          <div className="flex items-start gap-3">
            <img
              src={comment.userId.profilePic}
              alt="User"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{comment.userId.name}</p>
              <p className="text-sm text-[#4a2e2b]">{comment.text}</p>
              <div className="flex gap-4 mt-2 text-sm text-peach-700">
                <button className="flex items-center gap-1">
                  <ThumbsUp size={14} /> {comment.likes}
                </button>
                <button
                  onClick={() =>
                    setReplyInput((prev) => ({
                      ...prev,
                      [comment._id]: prev[comment._id] ? "" : "",
                    }))
                  }
                  className="flex items-center gap-1"
                >
                  <MessageCircle size={14} /> Reply
                </button>
              </div>

              {replyInput[comment._id] !== undefined && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={replyInput[comment._id]}
                    onChange={(e) =>
                      setReplyInput({ ...replyInput, [comment._id]: e.target.value })
                    }
                    placeholder="Reply..."
                    className="border rounded px-2 py-1 text-sm w-full"
                  />
                  <button
                    onClick={() => handleReplySubmit(comment._id)}
                    className="bg-peach-500 text-white px-2 rounded"
                  >
                    Reply
                  </button>
                </div>
              )}

              {comment.replies?.map((reply) => (
                <div key={reply._id} className="mt-3 ml-6 flex gap-2 items-start">
                  <img
                    src={reply.userId?.profilePic}
                    className="w-7 h-7 rounded-full"
                    alt=""
                  />
                  <div className="bg-white/50 rounded-lg px-3 py-1 text-sm">
                    <p className="font-semibold">{reply.userId?.name}</p>
                    <p>{reply.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
