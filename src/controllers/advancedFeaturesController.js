import User from "../models/Users.js";
import Categories from "../models/Categories.js";
import Posts from "../models/Posts.js";
import Tags from "../models/Tags.js";

// 1. Advanced full text search (with weighted indexing)
// Tested with Postman
// Endpoint: POST /api/advanced/search
const searchPosts = async (req, res) => {
  const search = req.body.search || "";
  try {
    const post =
      search !== ""
        ? await Posts.aggregate([
            { $match: { $text: { $search: search } } },
            { $addFields: { score: { $meta: "textScore" } } },
            { $sort: { score: -1 } },
            { $limit: 10 },
          ])
        : await Posts.find();

    if (post.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found matching your search criteria",
      });
    }
    res.status(200).json({
      success: true,
      message: "Posts found successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error occured while searching the post",
      error: error.message,
    });
  }
};
// 2. Post analytics dashboard (Aggregation pipeline)
const postAnalytics = async (req, res) => {
  const posts = Posts.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        totalPosts: { $sum: 1 },
        totalLikes: { $sum: "$likes" },
        totalViews: { $sum: "$views" },
      },
    },
    { $sort: { _id: -1 } },
  ]);
  try {
    const analytics = await posts;
    res.status(200).json({
      success: true,
      message: "Post analytics fetched successfully",
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error occured while fetching post analytics",
      error: error.message,
    });
  }
};
// 3. Trending tags and categories (Aggregation and lookups)
// 4. MongoDB index optimization
// 5. Recommendation engine
// 6. User contribution stats

export { searchPosts, postAnalytics };
