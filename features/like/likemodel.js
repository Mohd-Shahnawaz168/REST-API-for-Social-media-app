import ApplicationError from "../errorHandler/errorhandler.js";
import PostModel from "../post/postModel.js";

let postModel = new PostModel();
export default class LikeModel {
  constructor(id, userId, postId) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
  }
}
