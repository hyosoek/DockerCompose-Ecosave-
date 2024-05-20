import * as redis from 'redis';

export const redisClient = redis.createClient({
  legacyMode: true,
  url: 'redis://redis:6397',
});
