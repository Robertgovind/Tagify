import Posts from "../models/Posts.js";
import Post from "../models/Posts.js";

// Tested
const createPost = async (req, res) => {
  const author = req.user.id;
  const { title, content, category, tags } = req.body;
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
      ...req.body,
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
// Tested
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
// Tested
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
// Tested
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
      { _id: id },
      { ...req }.body,
      {
        new: true,
      }
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
// Tested
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
// Tested
const viewPost = async (req, res) => {
  // This function handle viewing a post by its ID
  // It increments the view count and return the post details
  const { id } = req.params;
  try {
    const post = await Post.findOne({ _id: id })
      .populate("category", "name")
      .populate("tags", "name")
      .populate("author", "username email");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    // Increment the view count
    post.views += 1;
    await post.save();
    res.status(200).json({
      success: true,
      message: "Post viewed successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error viewing post",
      error: error.message,
    });
  }
};
// Tested
const likePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    // Check if the user has already liked the post
    if (post.likes.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You have already liked this post",
      });
    }
    // Add the user ID to the likes array
    post.likes.push(userId);
    // Save the updated post
    await post.save();
    res.status(200).json({
      success: true,
      message: "Post liked successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error liking post",
      error: error.message,
    });
  }
};
const dislikePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user.id;
  try {
    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    // Check if the user has already disliked the post
    if (post.likes.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You have already disliked this post",
      });
    }
    // Add the user ID to the dislikes array
    post.dislikes.push(userId);
    // Save the updated post
    await post.save();
    res.status(200).json({
      success: true,
      message: "Post liked successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error liking post",
      error: error.message,
    });
  }
};
const sharePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    // First find the post by id
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    // Check if the user has already shared the post
    if (post.shares.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You have already shared this post",
      });
    }
    // Add the userId to the sahre array in database
    post.shares.push(userId);
    await post.save();
    res.status(200).json({
      success: true,
      message: "Post shared successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sharing post",
      error: error.message,
    });
  }
};
// Tested
const getPostsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    // Fetch posts by category
    const posts = await Post.find({ category: categoryId })
      .populate("category", "name")
      .populate("tags", "name")
      .populate("author", "username email")
      .sort({ createdAt: -1 });
    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found for this category",
      });
    }
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching posts by category",
      error: error.message,
    });
  }
};
// Tested
const getPostsByTag = async (req, res) => {
  const { tagId } = req.params;
  try {
    // Fetch posts by tag
    const posts = await Post.find({ tags: tagId })
      .populate("category", "name")
      .populate("tags", "name")
      .populate("author", "username email")
      .sort({ createdAt: -1 });
    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found for this tag",
      });
    }
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching posts by tag",
      error: error.message,
    });
  }
};
// Tested
const getPostsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    // Fetch posts by user
    const posts = await Post.find({ author: userId })
      .populate("category", "name")
      .populate("tags", "name")
      .populate("author", "username email")
      .sort({ createdAt: -1 });
    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found for this user",
      });
    }
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching posts by user",
      error: error.message,
    });
  }
};
// Tested
const searchPosts = async (req, res) => {
  const { query } = req.query;
  try {
    // Validate query
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }
    // Search posts by title or content
    // $regex is used for case-insensitive search
    // $options: "i" makes the search case-insensitive
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    })
      .populate("category", "name")
      .populate("tags", "name")
      .populate("author", "username email")
      .sort({ createdAt: -1 });
    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found for this search query",
      });
    }
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching posts",
      error: error.message,
    });
  }
};
// Tested
const getLatestPosts = async (req, res) => {
  try {
    // Fetch latest posts
    const latestPosts = await Post.find()
      .populate("category", "name")
      .populate("tags", "name")
      .populate("author", "username email")
      .sort({ createdAt: -1 })
      .limit(5); // Limit to 5 latest posts

    res.status(200).json({
      success: true,
      posts: latestPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching latest posts",
      error: error.message,
    });
  }
};
// Tested
const getTrendingPosts = async (req, res) => {
  try {
    // Fetch trending posts based on likes, views, or shares
    // Here we assume that trending posts are determined by the number of likes a post has
    const trendingPosts = await Post.find()
      .populate("category", "name")
      .populate("tags", "name")
      .populate("author", "username email")
      .sort({ likes: -1 }) // Sort by likes for trending
      .limit(5); // Limit to 5 trending posts

    res.status(200).json({
      success: true,
      posts: trendingPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching trending posts",
      error: error.message,
    });
  }
};
// Tested
const getPostsByDate = async (req, res) => {
  const { date } = req.query; // Here we are expecting date in 'YYYY-MM-DD' format
  try {
    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date query parameter is required",
      });
    }

    // Fetch posts by date
    const posts = await Post.find({
      createdAt: {
        $gte: new Date(date),
        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
      },
    })
      .populate("category", "name")
      .populate("tags", "name")
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found for this date",
      });
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching posts by date",
      error: error.message,
    });
  }
};
// Tested
const getPostsByPopularity = async (req, res) => {
  const { popularity } = req.query; // Popularity can be based on these factors 'likes', 'views', 'shares'
  try {
    if (!popularity) {
      return res.status(400).json({
        success: false,
        message: "Popularity query parameter is required",
      });
    }

    // Fetch posts based on popularity
    let sortCriteria;
    switch (popularity) {
      case "likes":
        sortCriteria = { likes: -1 };
        break;
      case "views":
        sortCriteria = { views: -1 };
        break;
      case "shares":
        sortCriteria = { shares: -1 };
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid popularity criteria",
        });
    }

    const posts = await Post.find()
      .populate("category", "name")
      .populate("tags", "name")
      .populate("author", "username email")
      .sort(sortCriteria)
      .limit(5); // Limit to 5 posts based on popularity

    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found for this popularity criteria",
      });
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching posts by popularity",
      error: error.message,
    });
  }
};
// Tested
const getPostsByViews = async (req, res) => {
  const { views } = req.query;
  try {
    if (!views) {
      return res.status(400).json({
        success: false,
        message: "Views query parameter is required",
      });
    }

    // Fetch posts by views
    const posts = await Post.find({ views: { $gte: parseInt(views) } })
      .populate("category", "name")
      .populate("tags", "name")
      .populate("author", "username email")
      .sort({ views: -1 });

    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found with the specified views",
      });
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching posts by views",
      error: error.message,
    });
  }
};
const getPostsByLikes = async (req, res) => {
  try {
    const post = await Posts.find()
      .populate("category", "name")
      .populate("tags", "name")
      .populate("author", "username email")
      .sort({ likesCount: -1 })
      .limit(10);

    if (!post)
      return res
        .status(404)
        .json({ success: false, maessage: "Post cannot be foune" });
    res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      posts: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server occured while finding post ",
    });
  }
};
const getPostsByDislikes = async (req, res) => {
  try {
    const post = await Posts.find()
      .populate("category", "name")
      .populate("tags", "name")
      .populate("author", "username email")
      .sort({ dislikesCount: -1 })
      .limit(10);

    if (!post)
      return res
        .status(404)
        .json({ success: false, maessage: "Post cannot be foune" });
    res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      posts: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server occured while finding post ",
    });
  }
};
const getPostsByShares = async (req, res) => {
  try {
    const post = await Posts.find()
      .populate("category", "name")
      .populate("tags", "name")
      .populate("author", "username email")
      .sort({ sharesCount: -1 })
      .limit(10);

    if (!post)
      return res
        .status(404)
        .json({ success: false, maessage: "Post cannot be foune" });
    res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      posts: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server occured while finding post ",
    });
  }
};

export {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  viewPost,
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
