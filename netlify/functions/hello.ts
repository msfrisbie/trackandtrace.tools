import { Handler } from "@netlify/functions";
import { createClient } from "redis";

const handler: Handler = async (event, context) => {
  const url = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}:${process.env.REDIS_PORT}`;
  const client = createClient({
    url,
  });

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  await client.set("key", "value");

  return {
    statusCode: 200,
    body: JSON.stringify({ message: await client.get("key") }),
  };
};

export { handler };
