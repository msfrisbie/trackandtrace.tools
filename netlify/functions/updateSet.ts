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

  console.log(tagsToAdd);

  let tagSet = [];
  try {
    await client.expire(tagSetKey, THIRTY_DAYS);

    if (tagsToAdd.length > 0) {
      await client.sAdd(tagSetKey, tagsToAdd);
    }
    if (tagsToRemove.length > 0) {
      await client.sRem(tagSetKey, tagsToRemove);
    }

    tagSet = await client.sMembers(tagSetKey);
  } catch (e) {
    console.log(e);
  }

  await client.disconnect();

  return {
    statusCode: 200,
    body: JSON.stringify({
      tagSet,
    }),
  };
};

export { handler };
