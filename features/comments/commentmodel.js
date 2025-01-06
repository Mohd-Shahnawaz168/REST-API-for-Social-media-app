import ApplicationError from "../errorHandler/errorhandler.js";
import PostModel from "../post/postModel.js";
let postModel = new PostModel();

export default class CommentModel {
  constructor(id, userId, postId, content) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
    this.content = content;
  }
}
