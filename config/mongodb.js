import { MongoClient } from "mongodb";
let client;
let Url = "mongodb://localhost:27017";
export let ConectToMongoDb = () => {
  MongoClient.connect(Url)
    .then((clientInstence) => {
      client = clientInstence;
      console.log("MongoDb is connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getDb = () => {
  return client.db("postaway-II");
};
