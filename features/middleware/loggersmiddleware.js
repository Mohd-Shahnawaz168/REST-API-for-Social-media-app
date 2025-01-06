import { json } from "express";
import fs from "fs";

let log = (data) => {
  fs.appendFileSync("log.txt", ` \n ${data}`);
};

export let logger = (req, res, next) => {
  if (!req.url.includes("signIn")) {
    let data = req.url + "-" + JSON.stringify(req.body);
    log(data);
  }
  next();
};
