import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongodb.js";
import ApplicationError from "../errorHandler/errorhandler.js";
export default class FriendshipRepository {
  collection = "FriendShip";
  async getFriendsByUserId(userId) {
    let db = getDb();
    let collection = db.collection(this.collection);
    return await collection.find({ userId: new ObjectId(userId) }).toArray();
  }
  async getPendingRequest(userId) {
    let db = getDb();
    let collection = db.collection(this.collection);
    return await collection
      .find({ userId: new ObjectId(userId), status: "pending" })
      .toArray();
  }
  async toggleFriendship(userId, friendsId) {
    let db = getDb();
    let collection = db.collection(this.collection);
    let checkAlreadyFriend = await collection.findOne({
      userId: new ObjectId(userId),
      friendsId: new ObjectId(friendsId),
    });
    console.log(checkAlreadyFriend);
    if (checkAlreadyFriend) {
      throw new ApplicationError("request already sent", 400);
    }
    let findFriend = await db
      .collection("User")
      .findOne({ _id: new ObjectId(friendsId) });
    if (!findFriend) {
      throw new ApplicationError("Friends Id is not available", 400);
    }
    let sentRequest = await collection.insertOne({
      userId: new ObjectId(userId),
      friendsId: new ObjectId(friendsId),
      status: "pending",
    });
    let friend = { friendsId: new ObjectId(friendsId), status: "pending" };
    let addingfriendInUser = await db.collection("User").updateOne(
      { _id: new ObjectId(userId) },
      {
        $push: { Friends: friend },
      }
    );

    return true;
  }
  async responseToRequest(userId, friendsId, result) {
    let db = getDb();
    let collection = db.collection(this.collection);

    if (result !== "accept" && result !== "reject") {
      throw new ApplicationError("result should be accept or reject", 400);
    }

    //update in friendShip collection
    let responding = await collection.updateOne(
      {
        userId: new ObjectId(userId),
        friendsId: new ObjectId(friendsId),
      },
      { $set: { status: result } }
    );
    if (responding.modifiedCount == 0) {
      throw new ApplicationError("failed to response to request", 400);
    }
    if (responding.matchedCount == 0) {
      throw new ApplicationError("friend request not found", 400);
    }

    //update in User collection
    let changeUserProfile = await db.collection("User").updateOne(
      {
        _id: new ObjectId(userId),
        "Friends.friendsId": new ObjectId(friendsId),
      },
      {
        $set: { "Friends.$.status": result },
      }
    );
    if (changeUserProfile.modifiedCount == 0) {
      throw new ApplicationError("failed to response to request", 400);
    }
    if (changeUserProfile.matchedCount == 0) {
      throw new ApplicationError("friend request not found", 400);
    }
    return `friend request is ${result}`;
  }
}
