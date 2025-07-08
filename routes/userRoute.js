import express from "express";
import { registerUser, loginUser } from "../controllers/userConroller.js";

const userRouter = express.Router();

userRouter.post("/register-user", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
