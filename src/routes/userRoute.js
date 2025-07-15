import express from "express";
import { registerUser, loginUser } from "../controllers/userConroller.js";
import uploadSingleFile from "../middlewares/uploadSingleFile.js";

const userRouter = express.Router();

userRouter.post("/register-user", uploadSingleFile, registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
