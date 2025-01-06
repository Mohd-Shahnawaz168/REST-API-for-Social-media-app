import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongodb.js";
import ApplicationError from "../errorHandler/errorhandler.js";
export default class UserRepository {
  collection = "User";

  async getAllUser() {
    let db = getDb();
    let collection = db.collection(this.collection);
    let allUser = await collection.find({}).toArray();
    return allUser;
  }

  async addUser(name, email, password, gender, avatar) {
    let db = getDb();
    let collection = db.collection(this.collection);
    //console.log(password);
    return await collection.insertOne({
      name,
      email,
      password,
      gender,
      avatar,
    });
  }

  async verifyuser(email) {
    let db = getDb();
    let collection = db.collection(this.collection);
    let user = await collection.findOne({ email: email });
    if (user) {
      return user;
    } else {
      throw new ApplicationError("user not found", 401);
    }
  }

  async updatePassword(email, newPassword) {
    let db = getDb();
    let collection = db.collection(this.collection);
    await collection.updateOne(
      { email: email },
      { $set: { password: newPassword } }
    );
    return "password Updated";
  }

  async updateAvatar(userId, name, gender, avatar) {
    let db = getDb();
    let collection = db.collection(this.collection);
    let updatedData = {};
    if (name !== undefined) {
      updatedData.name = name;
    }
    if (gender !== undefined) {
      updatedData.gender = gender;
    }
    if (avatar !== undefined) {
      updatedData.avatar = avatar;
    }
    let update = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updatedData }
    );
    if (update.matchedCount == 0) {
      throw new ApplicationError("user not available", 400);
    } else {
      return "avatar updated";
    }
  }
}
