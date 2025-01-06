import express from "express";
import LikeController from "./likecontroller.js";

let likecontroller = new LikeController();
export let likeRouter = express.Router();

likeRouter.post("/addlike/:postId", likecontroller.addLike);
likeRouter.delete("/deletelike/:likeId", likecontroller.deleteLike);
likeRouter.get("/getlike", likecontroller.getLikeByUser);
