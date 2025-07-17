import express from "express";
import dbConnection from "./src/config/db.js";
import "dotenv/config";
import userRouter from "./src/routes/userRoute.js";
import categoryRouter from "./src/routes/categoryRoutes.js";
import tagsRouter from "./src/routes/tagsRoute.js";
import postRouter from "./src/routes/postRoute.js";
import commentsRouter from "./src/routes/commentsRoute.js";
import auth from "./src/middlewares/auth.js";
import advancedFeatureRouter from "./src/routes/advancedFeatureRoute.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/uploads")); // Serve static files from 'uploads' directory

// connection to database
dbConnection();

// user routes
app.use("/api/auth", userRouter);
// category routes
app.use("/api/category", auth, categoryRouter);
// tags routes
app.use("/api/tags", auth, tagsRouter);
// post routes
app.use("/api/posts", auth, postRouter);
// comments routes
app.use("/api/comments", auth, commentsRouter);
// advanced features routes
app.use("/api/advanced", auth, advancedFeatureRouter);
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Backend is working" });
});

export default app;
