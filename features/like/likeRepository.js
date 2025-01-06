import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongodb.js";
import PostRepository from "../post/postRepository.js";
import ApplicationError from "../errorHandler/errorhandler.js";
let postRepository = new PostRepository();
export default class LikeRepository {
  collection = "Like";

  async addLike(userId, postId) {
    if (userId.length !== 24 || postId.length !== 24) {
      throw new ApplicationError(
        "incorrect postId length of id should have 24 charecter",
        400
      );
    }
    let post = await postRepository.getPostById(postId);
    let db = getDb();
    let collection = db.collection(this.collection);
    let findPost = await collection.findOne({
      userId: new ObjectId(userId),
      postId: new ObjectId(postId),
    });
    if (!findPost) {
      await collection.insertOne({
        userId: new ObjectId(userId),
        postId: new ObjectId(postId),
      });
      return "Liked to post";
    } else {
      return "already liked to post";
    }
  }

  async deleteLike(userId, likeId) {
    if (userId.length !== 24 || likeId.length !== 24) {
      throw new ApplicationError(
        "incorrect postId length of id should have 24 charecter",
        400
      );
    }
    let db = getDb();
    let collection = db.collection(this.collection);
    let deletedLike = await collection.deleteOne({
      _id: new ObjectId(likeId),
      userId: new ObjectId(userId),
    });
    if (deletedLike.deletedCount !== 1) {
      throw new ApplicationError("no Likes found for given user", 401);
    } else {
      return "Like deleted successfully";
    }
  }

  async getLikeByUser(userId) {
    if (userId.length !== 24) {
      throw new ApplicationError(
        "incorrect postId length of id should have 24 charecter",
        400
      );
    }
    let db = getDb();
    let collection = db.collection(this.collection);
    return await collection.find({ userId: new ObjectId(userId) }).toArray();
  }
}
