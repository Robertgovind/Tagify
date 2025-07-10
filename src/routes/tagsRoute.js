import express from "express";
import {
  getTags,
  addTag,
  updateTag,
  deleteTag,
} from "../controllers/tagsController.js";

const tagsRouter = express.Router();

// Route to get all tags
tagsRouter.get("/", getTags);
tagsRouter.post("/add", addTag);
tagsRouter.put("/update/:id", updateTag);
tagsRouter.delete("/delete/:id", deleteTag);

export default tagsRouter;
