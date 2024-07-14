import ConnectToMongo from "@/utils/ConnectToMongo";
import { getTheDataFromApi } from "@/utils/getTheDataFromApi";
import mapApiDataToDbData from "@/utils/mapApiDatatoDbData";

let isPolling = false;
let pollingInterval = 1000 * 60;
let isPollingActive = false;

export async function POST() {
  // Start the polling
  if (!isPolling) {
    await startPolling();
    return Response.json({ message: "polling started " });
  }
  return Response.json({ message: "polling in progress " });
}

const pollData = async () => {
  if (isPollingActive) return;
  isPollingActive = true;
  const db = await ConnectToMongo()!;

  if (!db) {
    console.log({ error: "Failed to connect to MongoDB" });
    isPollingActive = false;

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
    isPollingActive = false;
  }
};

const startPolling = async () => {
  isPolling = true;
  let timer = setInterval(() => {
    if (isPollingActive) return;
    pollData();
  }, pollingInterval);
};
