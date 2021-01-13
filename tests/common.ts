import { MongoClient } from "../mod.ts";

const hostname = "127.0.0.1";

export async function testWithClient(
  name: string,
  fn: (client: MongoClient) => void | Promise<void>,
) {
  Deno.test(name, async () => {
    const client = await getClient();
    await fn(client);
    client.close();
  });
}

async function getClient(): Promise<MongoClient> {
  const client = new MongoClient();
  await client.connect(`mongodb://${hostname}:27017`);
  return client;
}

export async function cheanup() {
  const db = (await getClient()).database("test");
  await db.collection("mongo_test_users").drop();
}
