const redis = require("redis");

let redisClient = null;

const connectRedis = async () => {
	if (process.env.REDIS_ENABLED !== "true") {
		console.log("Redis is disabled");
		return null;
	}

	try {
		redisClient = redis.createClient({
			url: process.env.REDIS_URL || "redis://localhost:6379",
			socket: {
				connectTimeout: 5000,
			},
		});

		redisClient.on("error", (err) => {
			console.error("Redis Client Error:", err);
		});

		redisClient.on("connect", () => {
			console.log("✅ Redis Connected Successfully");
		});

		await redisClient.connect();
		return redisClient;
	} catch (error) {
		console.error("❌ Redis Connection Error:", error.message);
		console.log("Continuing without Redis cache...");
		return null;
	}
};

const getRedisClient = () => redisClient;

const disconnectRedis = async () => {
	if (redisClient) {
		await redisClient.quit();
		console.log("Redis disconnected");
	}
};

module.exports = {
	connectRedis,
	getRedisClient,
	disconnectRedis,
};
