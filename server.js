import { ConectToMongoDb } from "./config/mongodb.js";
import express, { json } from "express";
import cookieParser from "cookie-parser";
import { userRouter } from "./features/user/userRouter.js";
import { postRouter } from "./features/post/postRouter.js";
import { jwtAuthVerify } from "./features/middleware/jwtauth.js";
import { likeRouter } from "./features/like/likeRouter.js";
import { commentRouter } from "./features/comments/commentRouter.js";
import { friendsRouter } from "./features/frienship/friendshiprouter.js";
import ApplicationError from "./features/errorHandler/errorhandler.js";
import { logger } from "./features/middleware/loggersmiddleware.js";
import swagger from "swagger-ui-express";
import apiDocs from "./swagger.json" assert { type: "json" };
const server = express();
server.use(cookieParser());
server.use(express.json()); //using express to parse the body or use body-parser npm
server.use(logger);
server.use("/postaway/api/user", userRouter);
server.use("/postaway/api/post", jwtAuthVerify, postRouter);
server.use("/postaway/api/like", jwtAuthVerify, likeRouter);
server.use("/postaway/api/comment", jwtAuthVerify, commentRouter);
server.use("/postaway/api/friends", jwtAuthVerify, friendsRouter);

server.get("/postawayapi", (req, res) => {
  res.send("welcome to postaway project");
});
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

server.use((err, req, res, next) => {
  if (err instanceof ApplicationError) {
    // console.log(err);
    res.status(err.statusCode).send(err.message);
  } else {
    console.log(err);
    res.status(500).send("server Error");
  }
});
server.use((req, res) => {
  res.send("please provide valid URl");
});

server.listen(2500, () => {
  console.log("server is listening on 2500");
  ConectToMongoDb();
});
