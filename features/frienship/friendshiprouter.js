import express from "express";
export let friendsRouter = express.Router();
import FriendshipController from "./friendshipcontroller.js";
let friendshipcontroller = new FriendshipController();
friendsRouter.get("/get-friends", friendshipcontroller.getFriendsByUserId);
friendsRouter.get(
  "/get-pending-requests",
  friendshipcontroller.getPendingRequest
);
friendsRouter.post(
  "/toggle-friendship/:friendId",
  friendshipcontroller.toggleFriendship
);
friendsRouter.post(
  "/response-to-request/:friendId",
  friendshipcontroller.responseToRequest
);
