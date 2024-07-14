import ConnectToMongo from "@/utils/ConnectToMongo";
export async function GET() {
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
    console.log({ error });

    return Response.json({ data: error });
  } finally {
    client.close();
  }
}

// This is to make this route dynamic
export async function POST() {
  return Response.json({ test: "working" });
}
