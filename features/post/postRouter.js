import express from "express";
import PostController from "./postcontroller.js";
import { upload } from "../middleware/uploadmulter.js";

let postcontroller = new PostController();
export const postRouter = express.Router();

postRouter.post("/addpost", upload.single("imageUrl"), postcontroller.addpost);
postRouter.get("/getuserpost", postcontroller.getUserPost);
postRouter.get("/getAllPost", postcontroller.getAllPost);
postRouter.get("/getPostById/:postId", postcontroller.getPostById);
postRouter.put("/updatePost", postcontroller.updatePost);
postRouter.delete("/deletePost", postcontroller.deletePost);
