import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPostById);
postRouter.post("/create-post", createPost);
postRouter.put("/update/:id", updatePost);
postRouter.delete("/delete/:id", deletePost);

export default postRouter;
