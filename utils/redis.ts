import { createClient } from "redis";

export async function getRedisClient({
  autoConnect,
}: {
  autoConnect: boolean;
}) {
  const url = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}:${process.env.REDIS_PORT}`;
  const client = createClient({
    url,
  });

  client.on("error", (err) => console.log("Redis Client Error", err));

  if (autoConnect) {
    await client.connect();
  }

  return client;
}
