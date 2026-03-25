import express from "express";
import {
  checkAuth,
  login,
  signup,
  updatedProfile,
} from "../controller/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/update-profile", protectRoute, updatedProfile);
userRouter.get("/check", protectRoute, checkAuth);

export default userRouter;
