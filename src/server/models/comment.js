const mongoose = require('mongoose');

const CommentScheme = mongoose.Schema({
  newsId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Comment = mongoose.model('comment', CommentScheme);

module.exports = Comment;
