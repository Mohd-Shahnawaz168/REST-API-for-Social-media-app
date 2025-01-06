import CommentModel from "./commentmodel.js";
import CommentRepository from "./commentRepository.js";
let commentRepository = new CommentRepository();
let commentmodel = new CommentModel();
export default class CommentController {
  async addComment(req, res, next) {
    try {
      let userId = req.userId;
      let postId = req.body.postId;
      let content = req.body.content;
      // console.log(userId, postId, content);
      let comment = await commentRepository.addComment(userId, postId, content);
      res.status(201).send("comment Added");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      let userId = req.userId;
      let commentId = req.body.commentId;
      let deletingComment = await commentRepository.deleteComment(
        userId,
        commentId
      );
      if (deletingComment.deletedCount == 1) {
        res.status(200).send("comment deleted");
      } else {
        res.status(400).send("No comment found");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateComment(req, res, next) {
    try {
      let userId = req.userId;
      let commentId = req.body.commentId;
      let content = req.body.content;
      let updatingComment = await commentRepository.updateComment(
        userId,
        commentId,
        content
      );
      if (updatingComment.matchedCount == 0) {
        return res.status(401).send("No comment available for this user");
      } else {
        res.status(200).send(updatingComment);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getCommentByUser(req, res, next) {
    try {
      let userId = req.userId;
      let getComments = await commentRepository.getCommentByUser(userId);
      return res.status(200).send(getComments);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
