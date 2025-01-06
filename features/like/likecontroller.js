import LikeRepository from "./likeRepository.js";
let likeRepository = new LikeRepository();
export default class LikeController {
  async addLike(req, res, next) {
    try {
      let userId = req.userId;
      let postId = req.params.postId;
      let like = await likeRepository.addLike(userId, postId);
      res.status(201).send(like);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteLike(req, res, next) {
    try {
      let userId = req.userId;
      let likeId = req.params.likeId;
      let deleteLike = await likeRepository.deleteLike(userId, likeId);
      res.status(200).send(deleteLike);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getLikeByUser(req, res, next) {
    try {
      let userId = req.userId;
      let likes = await likeRepository.getLikeByUser(userId);
      if (likes.length > 0) {
        res.status(200).send(likes);
      } else {
        res.status(400).send("No post Like by user");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
