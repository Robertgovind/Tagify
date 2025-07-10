import express from "express";
import {
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
} from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.get("/postId/:id", getPostById);
postRouter.post("/create-post", createPost);
postRouter.put("/update/:id", updatePost);
postRouter.delete("/delete/:id", deletePost);
postRouter.get("/view-post/:id", viewPost);
postRouter.post("/like/:id", likePost);
postRouter.post("/dislike/:id", dislikePost);
postRouter.get("/category/:categoryId", getPostsByCategory);
postRouter.get("/tags/:tagId", getPostsByTag);
postRouter.get("/user/:userId", getPostsByUser);
postRouter.get("/search", searchPosts);
postRouter.get("/latestPost", getLatestPosts);
postRouter.get("/trendingPost", getTrendingPosts);
postRouter.get("/postByDate", getPostsByDate);
postRouter.get("/postPopularity", getPostsByPopularity);
postRouter.get("/filterPostViews", getPostsByViews);

export default postRouter;
