import { getDb } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import ApplicationError from "../errorHandler/errorhandler.js";

export default class PostRepository {
  collection = "Post";

  async getUserpost(userId) {
    let db = getDb();
    let collection = db.collection(this.collection);
    return await collection.find({ userId: new ObjectId(userId) }).toArray();
  }

  async getAllPost() {
    let db = getDb();
    let collection = db.collection(this.collection);
    return await collection.find({}).toArray();
  }

  async getPostById(postId) {
    let db = getDb();
    let collection = db.collection(this.collection);
    //console.log(postId.length);
    if (postId.length !== 24) {
      throw new ApplicationError(
        "incorrect postId length of id should have 24 charecter",
        400
      );
    }
    //console.log(postId);
    let post = await collection.findOne({ _id: new ObjectId(postId) });
    //console.log(post);
    if (post) {
      return post;
    } else {
      throw new ApplicationError("No post Available", 400);
    }
  }

  async addpost(userId, caption, imageUrl) {
    let db = getDb();
    let collection = db.collection(this.collection);
    return await collection.insertOne({
      userId: new ObjectId(userId),
      caption: caption,
      imageUrl: imageUrl,
    });
  }

  async updatePost(userId, postId, caption) {
    if (postId.length !== 24 || userId.length !== 24) {
      throw new ApplicationError(
        "incorrect Id length of id should have 24 charecter",
        400
      );
    }
    let db = getDb();
    let collection = db.collection(this.collection);
    return await collection.updateOne(
      {
        userId: new ObjectId(userId),
        _id: new ObjectId(postId),
      },
      { $set: { caption: caption } }
    );
  }

  async deletePost(userId, postId) {
    if (postId.length !== 24 || userId.length !== 24) {
      throw new ApplicationError(
        "incorrect Id length of id should have 24 charecter",
        400
      );
    }
    let db = getDb();
    let collection = db.collection(this.collection);
    console.log(userId, postId);
    return await collection.deleteOne({
      userId: new ObjectId(userId),
      _id: new ObjectId(postId),
    });
  }
}
