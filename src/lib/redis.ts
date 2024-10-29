import { createClient, RedisClientType } from 'redis';

let client: RedisClientType | null = null;

async function getRedisClient(): Promise<RedisClientType> {
  if (!client) {
    try {
      client = createClient({
        url: process.env.REDIS_URL,
      });
      await client.connect();
    } catch (e) {
      console.error(e);
    }
  }
  if (!client) {
    throw new Error('Failed to create Redis client');
  }
  return client;
}

export default getRedisClient;