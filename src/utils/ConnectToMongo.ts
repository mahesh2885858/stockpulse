import { MongoClient, ServerApiVersion } from "mongodb";
const DB_NAME = "db1";
const COLLECTION_NAME = "stockpulse";
const ConnectToMongo = async () => {
  try {
    const client = new MongoClient(
      "mongodb+srv://mahesh2885858:UT5zrKyKzFFFIGhZ@cluster0.7fcuy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        serverApi: ServerApiVersion.v1,
      }
    );

    const db = client.db(DB_NAME);
    // We are only handling one collection for the test
    const collection = db.collection(COLLECTION_NAME);

    return { client, collection };
  } catch (error) {
    console.log("error", error);
  }
};

export default ConnectToMongo;
