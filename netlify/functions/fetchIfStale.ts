import { Handler } from "@netlify/functions";
import { getRedisClient } from "utils/redis";

const THIRTY_DAYS = 60 * 60 * 24 * 30;

const handler: Handler = async (event, context) => {
  const client = await getRedisClient({ autoConnect: true });

  const { tagSetId, timestamp, nonce } = event.queryStringParameters;

  if (!nonce) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Must provide nonce" }),
    };
  }

  if (!tagSetId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Must provide tagSetId" }),
    };
  }

  if (!timestamp) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Must provide timestamp" }),
    };
  }

  const tagSetKey = `tagset_${tagSetId}`;
  const tagSetLastTouchedKey = `tagset_lasttouched_${tagSetId}`;

  let tagSet = null;
  let lastTouched = null;

  try {
    await client.expire(tagSetKey, THIRTY_DAYS);
    await client.expire(tagSetLastTouchedKey, THIRTY_DAYS);

    lastTouched = await client.get(tagSetLastTouchedKey);

    if (timestamp !== lastTouched) {
      tagSet = await client.sMembers(tagSetKey);
    }
  } catch (e) {
    console.error(e);
  }

  await client.disconnect();

  return {
    statusCode: 200,
    body: JSON.stringify({
      lastTouched,
      tagSet,
    }),
  };
};

export { handler };
