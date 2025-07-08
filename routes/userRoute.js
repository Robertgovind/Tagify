import express from "express";
import { registerUser, loginUser } from "../controllers/userConroller.js";

const userRouter = express.Router();

userRouter.post("/register-user", registerUser);

export default userRouter;
