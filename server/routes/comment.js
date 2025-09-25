const express=require ("express")
const Comment = require ("../models/comment.js")
const {isLoggedIn} = require ("../middlewares/auth.js");

const router = express.Router();

// Add a new comment
router.post("/add", isLoggedIn, async (req, res) => {
  const { blogId, text } = req.body;
  try {
    const comment = new Comment({
      blogId,
      text,
      userId: req.user._id,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ msg: "Error posting comment" });
  }
});

// Like a comment
router.patch("/:id/like", isLoggedIn, async (req, res) => {
  try {
    const updated = await Comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Like failed" });
  }
});

// Reply to a comment
router.post("/:id/reply", isLoggedIn, async (req, res) => {
  const { text } = req.body;
  try {
    const comment = await Comment.findById(req.params.id);
    comment.replies.push({
      text,
      userId: req.user._id,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ msg: "Reply failed" });
  }
});

// Get comments by blog
router.get("/blog/:blogId", async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId })
      .populate("userId", "name profilePic")
      .populate("replies.userId", "name profilePic")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching comments" });
  }
});

module.exports= router;
