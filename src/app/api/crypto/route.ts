import ConnectToMongo from "@/utils/ConnectToMongo";
import { getTheDataFromApi } from "@/utils/getTheDataFromApi";
import mapApiDataToDbData from "@/utils/mapApiDatatoDbData";

let isPolling = false;
let pollingInterval = 1000 * 60;

export async function GET() {
  // Start the polling
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
    const data = await collection
      .find({})
      .sort({ timeStamp: -1 })
      .limit(20)
      .toArray();

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
    await collection.insertOne({
      coinData: dataForDb,
      timeStamp: new Date(),
    });
  } catch (error) {
    console.log({ error });
  } finally {
    client.close();
  }
};

const startPolling = async () => {
  isPolling = true;
  let timer = setInterval(() => {
    pollData();
  }, pollingInterval);
};

export async function POST() {
  return Response.json({ test: "working" });
}
