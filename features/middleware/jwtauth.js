import jwt from "jsonwebtoken";
let privateKey = "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz";

export function createToken(id, name, email) {
  let payLoad = { userId: id, userName: name, userEmail: email };
  //console.log(payLoad);
  let token = jwt.sign(payLoad, privateKey, {
    expiresIn: "1h",
  });
  return token;
}

export function jwtAuthVerify(req, res, next) {
  //console.log(req.cookies);
  let token = req.cookies.jwtToken;
  //let token = req.headers["authorization"];
  //let tokens = req.get("Authorization"); both are correct to access authorization from headers

  if (!token) {
    return res.status(400).send("Unauthorize Entry ");
  }
  try {
    let payLoad = jwt.verify(token, privateKey);
    //console.log(payLoad);
    if (payLoad) {
      req.userId = payLoad.userId;
      req.userName = payLoad.userName;
      req.userEmail = payLoad.userEmail;
      next();
    } else {
      res.status(400).send("Invalid Token please login");
    }
  } catch (error) {
    console.log(error);
  }
}
