import { Handler } from "@netlify/functions";
import { getRedisClient } from "utils/redis";

const THIRTY_DAYS = 60 * 60 * 24 * 30;

const handler: Handler = async (event, context) => {
  const client = await getRedisClient({ autoConnect: true });

  const { tagSetId, addTags, removeTags, nonce } = event.queryStringParameters;

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

  const tagSetKey = `tagset_${tagSetId}`;

  const tagsToAdd = addTags ? addTags.split(",") : [];
  const tagsToRemove = removeTags ? removeTags.split(",") : [];

  const [expire, sAdd, sRemove, sMembers] = await client
    .multi()
    .expire(tagSetKey, THIRTY_DAYS)
    .sAdd(tagSetKey, tagsToAdd)
    .sRem(tagSetKey, tagsToRemove)
    .sMembers(tagSetKey)
    .exec();

  await client.disconnect();

  return {
    statusCode: 200,
    tagSet: sMembers,
  };
};

export { handler };
