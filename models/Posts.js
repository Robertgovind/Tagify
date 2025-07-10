import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikesCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    commentsCount: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    shares: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    sharesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Middleware to update counts before saving
postSchema.pre("save", function (next) {
  this.likesCount = this.likes.length;
  this.dislikesCount = this.dislikes.length;
  this.commentsCount = this.comments.length;
  this.sharesCount = this.shares.length;
  next();
});

postSchema.index({ title: "text", content: "text" });

export default mongoose.model("Post", postSchema);
