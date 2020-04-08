const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    gifSrc: {
      type: String,
      required: true,
      unique: true,
    },
    gifPublicId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      maxlength: 120,
      minlength: 1,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
