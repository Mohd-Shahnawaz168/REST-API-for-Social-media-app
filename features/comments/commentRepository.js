import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongodb.js";
import PostRepository from "../post/postRepository.js";
import ApplicationError from "../errorHandler/errorhandler.js";
let postRepository = new PostRepository();
export default class CommentRepository {
  collection = "Comment";

  async addComment(userId, postId, content) {
    if (userId.length !== 24 || postId.length !== 24) {
      throw new ApplicationError(
        "incorrect Id length of id should have 24 charecter",
        400
      );
    }
    let checkPost = await postRepository.getPostById(postId);
    let db = getDb();
    let collection = db.collection(this.collection);
    return await collection.insertOne({
      userId: new ObjectId(userId),
      postId: new ObjectId(postId),
      content: content,
    });
  }

  async deleteComment(userId, commentId) {
    if (userId.length !== 24 || commentId.length !== 24) {
      throw new ApplicationError(
        "incorrect Id length of id should have 24 charecter",
        400
      );
    }
    let db = getDb();
    let collection = db.collection(this.collection);
    let deletedComment = await collection.deleteOne({
      _id: new ObjectId(commentId),
      userId: new ObjectId(userId),
    });

    return deletedComment;
  }

  async updateComment(userId, commentId, content) {
    //console.log(userId, commentId, content);
    if (userId.length !== 24 || commentId.length !== 24) {
      throw new ApplicationError(
        "incorrect Id length of id should have 24 charecter",
        400
      );
    }
    let db = getDb();
    let collection = db.collection(this.collection);
    let update = await collection.updateOne(
      {
        _id: new ObjectId(commentId),
        userId: new ObjectId(userId),
      },
      {
        $set: {
          content: content,
        },
      }
    );
    return update;
  }

  async getCommentByUser(userId) {
    if (userId.length !== 24) {
      throw new ApplicationError(
        "incorrect Id length of id should have 24 charecter",
        400
      );
    }

    let db = getDb();
    let collection = db.collection(this.collection);
    let commentByUser = await collection
      .find({ userId: new ObjectId(userId) })
      .toArray();

    if (commentByUser.length > 0) {
      return commentByUser;
    } else {
      throw new ApplicationError(
        `No comments available of userId ${userId}`,
        400
      );
    }
  }
}
