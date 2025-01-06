import express from "express";

export let userRouter = express.Router();
import { avatar } from "../middleware/uploadmulter.js";
import { jwtAuthVerify } from "../middleware/jwtauth.js";

import UserController from "./userController.js";
let userController = new UserController();

userRouter.get("/allUser", userController.getAllUser);
userRouter.post("/singUp", avatar.single("avatar"), userController.singUp);
userRouter.post("/signIn", userController.signIn);
userRouter.get("/logOut", userController.logOut);
userRouter.get("/getOtp", userController.getOtp);
userRouter.put("/updatePassword", userController.updatePassword);
userRouter.put(
  "/updateavatar",
  avatar.single("avatar"),
  jwtAuthVerify,
  userController.updateAvatar
);
