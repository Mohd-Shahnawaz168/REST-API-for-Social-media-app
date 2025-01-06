import FriendshipRepository from "./friendshiprepository.js";
let friendshiprepository = new FriendshipRepository();

export default class FriendshipController {
  async getFriendsByUserId(req, res, next) {
    try {
      let userId = req.userId;
      let friendRequest = await friendshiprepository.getFriendsByUserId(userId);
      if (friendRequest.length > 0) {
        res.status(200).send(friendRequest);
      } else {
        res.status(400).send("No request");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getPendingRequest(req, res, next) {
    try {
      let userId = req.userId;
      let prndingRequest = await friendshiprepository.getPendingRequest(userId);
      if (prndingRequest.length > 0) {
        res.status(200).send(prndingRequest);
      } else {
        res.status(400).send("No request");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async toggleFriendship(req, res, next) {
    try {
      let userId = req.userId;
      let friendsId = req.params.friendId;
      let toggle = await friendshiprepository.toggleFriendship(
        userId,
        friendsId
      );
      res.status(201).send(`friend request sent to ${friendsId}`);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async responseToRequest(req, res, next) {
    try {
      let userId = req.userId;
      let friendsId = req.params.friendId;
      let result = req.body.result;
      let response = await friendshiprepository.responseToRequest(
        userId,
        friendsId,
        result
      );
      res.status(201).send(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
