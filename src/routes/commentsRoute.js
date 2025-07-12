import express from "express";
import {
  addComment,
  updateComment,
  getCommentsByPostId,
  deleteComment,
} from "../controllers/commentsController.js";
const router = express.Router();
router.post("/add/", addComment);
router.put("/update/:id", updateComment);
router.get("/getComments/:postId", getCommentsByPostId);
router.delete("/delete/:id", deleteComment);

export default router;
