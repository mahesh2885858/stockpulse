import { MongoClient, ServerApiVersion } from "mongodb";
const DB_NAME = "db1";
const COLLECTION_NAME = "stockpulse";
const ConnectToMongo = async () => {
  try {
    const MONGO_URL = process.env.MONGO_URL;
    if (!MONGO_URL) throw "Invalid URL";

    const client = new MongoClient(MONGO_URL, {
      serverApi: ServerApiVersion.v1,
    });

    const db = client.db(DB_NAME);
    // We are only handling one collection for the test
    const collection = db.collection(COLLECTION_NAME);

    return { client, collection };
  } catch (error) {
    console.log("error", error);
  }
};

export default ConnectToMongo;
