import { MongoClient, ServerApiVersion } from "mongodb";

const uri: string | undefined = process.env.MONGO_DB;
const client = new MongoClient(uri!, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectToDatabase() {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB);
  return { db };
}
