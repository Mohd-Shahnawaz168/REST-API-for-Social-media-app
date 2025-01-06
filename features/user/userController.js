import { createToken, jwtAuthVerify } from "../middleware/jwtauth.js";
import ApplicationError from "../errorHandler/errorhandler.js";
import UserRepository from "./userRepository.js";
import sendOTP from "../middleware/nodemail.js";
import fs from "fs-extra";
import path from "path";

import {
  hashPassword,
  comparehashedPassword,
} from "../middleware/hashingPassword.js";
let userRepository = new UserRepository();
let OTP;
export default class UserController {
  async getAllUser(req, res, next) {
    try {
      let allUsers = await userRepository.getAllUser();
      if (allUsers.length > 0) {
        res.status(200).send(allUsers);
      } else {
        throw new ApplicationError("no users Available", 400);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async singUp(req, res, next) {
    try {
      let { name, email, password, gender } = req.body;
      let avatar = req.file.filename;
      //console.log(avatar);
      let hashedPassword = await hashPassword(password);
      let addingUser = await userRepository.addUser(
        name,
        email,
        hashedPassword,
        gender,
        avatar
      );
      res.status(201).send({ msg: "Sign Up successfull", user: addingUser });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async signIn(req, res, next) {
    try {
      let { email, password } = req.body;
      let User = await userRepository.verifyuser(email);
      //console.log(User);
      let verifiedUser = await comparehashedPassword(User.password, password);
      //console.log(verifiedUser);

      if (verifiedUser == true) {
        let token = createToken(User._id, User.name, User.email);
        res
          .cookie("jwtToken", token, { maxAge: 900000, httpOnly: true })
          .status(200)
          .send({ msg: "Login successfully", token: token });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  logOut(req, res, next) {
    try {
      res.clearCookie("jwtToken");
      res.status(200).send("Logout Successfully");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getOtp(req, res) {
    try {
      let email = req.body.email;
      let verifyEmail = await userRepository.verifyuser(email);
      let GeneratedOTP = Math.floor(100000 + Math.random() * 900000);
      console.log(GeneratedOTP);
      OTP = GeneratedOTP;
      await sendOTP(OTP, email);
      res.status(200).send("OTP sent to your registered email ID");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updatePassword(req, res) {
    try {
      let { otp, newPassword, email } = req.body;
      if (otp !== OTP) {
        res.status(401).send("Incorrect OTP");
      } else {
        let newhashedPassword = await hashPassword(newPassword, 12);
        let update = await userRepository.updatePassword(
          email,
          newhashedPassword
        );
        res.status(201).send(update);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateAvatar(req, res, next) {
    try {
      fs.emptyDir("./uploads/avatar", (err) => {
        if (err) {
          return console.error(err);
        }
        // console.log("success!");
      });
      let { gender, name } = req.body;
      let userId = req.userId;
      let avatar;
      if (req.file == undefined) {
        avatar = undefined;
      } else {
        avatar = req.file.filename;
      }

      // fs.rmdir(paths, { recursive: true, force: true }, (err) => { //this will delete entire directory instead of file
      //   if (err) {
      //     console.log(err);
      //   }
      // });
      // fs.unlink(filepath, (err) => {
      //   if (err) {
      //     console.log(err);
      //   }
      // });

      //console.log(gender, name, userId, avatar);
      let updation = await userRepository.updateAvatar(
        userId,
        name,
        gender,
        avatar
      );
      res.status(200).send(updation);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

// assume this directory has a lot of files and folders
// With a callback:
