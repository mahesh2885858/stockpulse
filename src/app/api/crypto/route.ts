import { MongoClient, ServerApiVersion } from "mongodb";
import ConnectToMongo from "@/utils/ConnectToMongo";
import { getTheDataFromApi } from "@/utils/getTheDataFromApi";
import mapApiDataToDbData from "@/utils/mapApiDatatoDbData";

let lastUpdatedTime = Date.now();
let isPolling = false;
let pollingInterval = 1000 * 60;

export async function GET() {
  lastUpdatedTime = Date.now();
  if (!isPolling) {
    await pollData();
    await startPolling();
  }

  const db = await ConnectToMongo()!;
  if (!db) {
    return Response.json({ error: "Failed to connect to MongoDB" });
  }
  const { client, collection } = db;
  try {
    const data = await collection.find({}).limit(20).toArray();
    return Response.json({ data: data });
  } catch (error) {
    return Response.json({ data: "mahesh-error", error });
  } finally {
    client.close();
  }
}

const pollData = async () => {
  const db = await ConnectToMongo()!;

  if (!db) {
    console.log({ error: "Failed to connect to MongoDB" });
    return;
  }

  const { client, collection } = db;

  try {
    const dataFormApi = await getTheDataFromApi();

    if (!dataFormApi.success) {
      throw dataFormApi.error;
    }

    const dataForDb = mapApiDataToDbData(dataFormApi.data);
    const data = await collection.insertOne({
      coinData: dataForDb,
      timeStamp: new Date(),
    });
    console.log("data is being polled");
  } catch (error) {
    console.log({ error });
  } finally {
    client.close();
  }
};

const startPolling = async () => {
  isPolling = true;
  let timer = setInterval(() => {
    if (Date.now() - lastUpdatedTime > 10 * 60 * 1000) {
      clearInterval(timer);
      isPolling = false;
      return;
    }
    pollData();
  }, pollingInterval);
};
