import PostRepository from "./postRepository.js";
import ApplicationError from "../errorHandler/errorhandler.js";
let postRepository = new PostRepository();
export default class PostController {
  async getUserPost(req, res, next) {
    try {
      let userId = req.userId;
      console.log(userId);
      const postByUser = await postRepository.getUserpost(userId);
      if (postByUser.length > 0) {
        res.status(200).send(postByUser);
      } else {
        res.status(400).send(`No post found for userId ${userId}`);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAllPost(req, res, next) {
    try {
      const allPost = await postRepository.getAllPost();
      if (allPost.length > 0) {
        res.status(200).send(allPost);
      } else {
        res.status(400).send(`No post found`);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getPostById(req, res, next) {
    try {
      let postId = req.params.postId;
      //console.log(postId);
      let post = await postRepository.getPostById(postId);
      res.status(200).send(post);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async addpost(req, res, next) {
    try {
      let { caption } = req.body;
      let userId = req.userId;
      let imageUrl = req.file.filename;
      let posting = await postRepository.addpost(userId, caption, imageUrl);
      res
        .status(201)
        .send({ post: posting, msg: "Coangratulation! post Created" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updatePost(req, res, next) {
    try {
      let userId = req.userId;
      let postId = req.query.postId;
      let caption = req.query.caption;
      //console.log(userId, postId, caption);
      const updation = await postRepository.updatePost(userId, postId, caption);
      if (updation.modifiedCount == 1) {
        res.status(201).send({ msg: "Post Updated", updatedPost: updation });
      }
      if (updation.matchedCount == 0) {
        res.status(401).send({ msg: "Post not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deletePost(req, res, next) {
    try {
      let userId = req.userId;
      let postId = req.query.postId;
      let deletedPost = await postRepository.deletePost(userId, postId);
      console.log(deletedPost);
      if (deletedPost.deletedCount == 1) {
        return res.status(200).send("postDeleted");
      }
      if (deletedPost.deletedCount == 0) {
        return res.status(401).send("post not found");
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
