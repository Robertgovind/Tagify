import express from "express";
import dbConnection from "./config/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import categoryRouter from "./routes/categoryRoutes.js";
import tagsRouter from "./routes/tagsRoute.js";

const app = express();
app.use(express.json());

// connection to database
dbConnection();

// user routes
app.use("/api/auth", userRouter);
// category routes
app.use("/api/category", categoryRouter);
// tags routes
app.use("/api/tags", tagsRouter);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Backend is working" });
});

export default app;
