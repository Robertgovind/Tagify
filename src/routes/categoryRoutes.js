import express from "express";
import {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

// Define all the routes for categories here
categoryRouter.get("/", getAllCategories);
categoryRouter.post("/add", addCategory);
categoryRouter.put("/update/:_id", updateCategory);
categoryRouter.delete("/delete/:_id", deleteCategory);

export default categoryRouter;
