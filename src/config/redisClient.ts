import { createClient, RedisClientType } from "redis";

let redisClient: RedisClientType;

if (process.env.NODE_ENV === "test") {
  // para usar o mock no ambiente de teste
  const RedisMock = require("ioredis-mock");
  redisClient = new RedisMock();
} else {
  redisClient = createClient({
    url: "redis://localhost:6379",
  });

  redisClient.on("error", (err) => console.error("Redis Client Error", err));
}

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

export { connectRedis, redisClient };
