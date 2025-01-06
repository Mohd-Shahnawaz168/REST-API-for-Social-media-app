import express from "express";

export let commentRouter = express.Router();
import CommentController from "./commentcontroller.js";
let commentcontroller = new CommentController();

commentRouter.post("/addComment", commentcontroller.addComment);
commentRouter.get("/getCommentByUser", commentcontroller.getCommentByUser);
commentRouter.put("/updateComment", commentcontroller.updateComment);
commentRouter.delete("/deleteComment", commentcontroller.deleteComment);
