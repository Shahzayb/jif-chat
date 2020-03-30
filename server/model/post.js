const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    gifSrc: {
      type: String,
      required
    },
    gifPublicId: {
      type: String,
      required
    },
    title: {
      type: String,
      maxlength: 120,
      minlength: 1
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.Model('Post', postSchema);
