import Post from "../models/Posts.js";

const createPost = async (req, res) => {
  const { title, content, category, tags, author } = req.body;
  try {
    // Validate required fields
    if (!title || !content || !category || !tags || !author) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create a new post
    const newPost = await Post.create({
      title,
      content,
      category,
      tags,
      author,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occured while creating post",
      error: error.message,
    });
  }
};
const getAllPosts = async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.find()
      .populate("category", "name")
      .populate("tags", "name")
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching posts",
      error: error.message,
    });
  }
};
const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch post by ID
    const post = await Post.findById(id)
      .populate("category", "name")
      .populate("tags", "name")
      .populate("author", "username email");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching post",
      error: error.message,
    });
  }
};
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, tags } = req.body;

  try {
    // Validate required fields
    if (!title || !content || !category || !tags) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find and update the post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, category, tags },
      { new: true }
    )
      .populate("category", "name")
      .populate("tags", "name")
      .populate("author", "username email");

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating post",
      error: error.message,
    });
  }
};
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the post
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting post",
      error: error.message,
    });
  }
};
const viewPost = async (req, res) => {
  // This function handle viewing a post by its ID
  // It increments the view count and return the post details
};
const likePost = async (req, res) => {};
const dislikePost = async (req, res) => {};
const getPostsByCategory = async (req, res) => {};
const getPostsByTag = async (req, res) => {};
const getPostsByUser = async (req, res) => {};
const searchPosts = async (req, res) => {};
const getLatestPosts = async (req, res) => {};
const getTrendingPosts = async (req, res) => {};
const getPostsByDate = async (req, res) => {};
const getPostsByPopularity = async (req, res) => {};
const getPostsByViews = async (req, res) => {};
const getPostsByLikes = async (req, res) => {};
const getPostsByDislikes = async (req, res) => {};
const getPostsByShares = async (req, res) => {};

export {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  getPostsByCategory,
  getPostsByTag,
  getPostsByUser,
  searchPosts,
  getLatestPosts,
  getTrendingPosts,
  getPostsByDate,
  getPostsByPopularity,
  getPostsByViews,
  getPostsByLikes,
  getPostsByDislikes,
  getPostsByShares,
};
