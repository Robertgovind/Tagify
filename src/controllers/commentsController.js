import Comments from "../models/Comments.js";
import Post from "../models/Posts.js";

const addComment = async (req, res) => {
  const { postId, content } = req.body;
  const userId = req.user.id;

  if (!postId || !content) {
    return res.status(400).json({
      success: false,
      message: "Post ID and content are required",
    });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    const newComment = await Comments.create({ postId, userId, content });
    post.comments.push(newComment._id);
    await post.save();
    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
      post: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding comment",
      error: error.message,
    });
  }
};
const updateComment = async (req, res) => {
  const { postId, content } = req.body;
  const commentId = req.params.commentId;
  const userId = req.user.id;

  if (!postId || !content) {
    return res.status(400).json({
      success: false,
      message: "Post ID and content are required",
    });
  }
  try {
    const comment = await Comments.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this comment",
      });
    }
    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating comment",
      error: error.message,
    });
  }
};
const getCommentsByPostId = async (req, res) => {
  const postId = req.params.postId;
  try {
    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required",
      });
    }
    const { page = 1, limit = 10 } = req.query;
    // Implemented Pagination and skip
    const comments = await Comments.find({ postId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("userId", "username email");

    if (!comments || comments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No comments found for this post",
      });
    }
    res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      count: comments.length,
      comments: comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching comments",
      error: error.message,
    });
  }
};
const deleteComment = async (req, res) => {
  const { commentId } = req.params.commentId;
  const userId = req.user.id;

  if (!commentId) {
    return res
      .status(400)
      .json({ success: false, message: "Comment id requried" });
  }
  const comment = await Comments.findById(commentId);
  if (!comment) {
    return res
      .status(400)
      .json({ success: false, message: "No comment were fuond" });
  }
  if (comment.userId.toString() !== userId) {
    return res.status(400).json({
      success: false,
      message: "You are not authorized to delete the comment",
    });
  }
  // Deleting comment
  await comment.deleteOne();
  // Deleting comment reference from user's posts
  await Post.findByIdAndUpdate(comment.postId, {
    $pull: { comments: comment._id },
  });

  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occured while deleting the post",
      message: error.message,
    });
  }
};

export { addComment, updateComment, getCommentsByPostId, deleteComment };
