import express from "express";
import {
  searchPosts,
  postAnalytics,
} from "../controllers/advancedFeaturesController.js";
import e from "express";

const advancedFeatureRouter = express.Router();

advancedFeatureRouter.post("/search", searchPosts);
advancedFeatureRouter.get("/analytics", postAnalytics);

export default advancedFeatureRouter;
