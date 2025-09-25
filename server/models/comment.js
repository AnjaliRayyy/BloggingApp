const mongoose = require ("mongoose")

const replySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
});

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  replies: [replySchema],
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment
