const { getRedisClient } = require("../config/redis");

/**
 * Cache middleware for property listings
 * Caches GET requests for a specified duration
 */
const cacheProperties = (duration = 300) => {
	return async (req, res, next) => {
		const redisClient = getRedisClient();

		// Skip cache if Redis is not available
		if (!redisClient || !redisClient.isOpen) {
			return next();
		}

		// Only cache GET requests
		if (req.method !== "GET") {
			return next();
		}

		// Create cache key from URL and query parameters
		const cacheKey = `properties:${req.originalUrl || req.url}`;

		try {
			const cachedData = await redisClient.get(cacheKey);

			if (cachedData) {
				console.log("✅ Cache HIT:", cacheKey);
				return res.json(JSON.parse(cachedData));
			}

			console.log("❌ Cache MISS:", cacheKey);

			// Store original res.json
			const originalJson = res.json.bind(res);

			// Override res.json to cache the response
			res.json = (body) => {
				// Cache the response
				redisClient
					.setEx(cacheKey, duration, JSON.stringify(body))
					.catch((err) => console.error("Redis cache error:", err));

				// Send the response
				return originalJson(body);
			};

			next();
		} catch (error) {
			console.error("Cache middleware error:", error);
			next();
		}
	};
};

/**
 * Clear cache for specific pattern
 */
const clearCache = async (pattern = "properties:*") => {
	const redisClient = getRedisClient();

	if (!redisClient || !redisClient.isOpen) {
		return;
	}

	try {
		const keys = await redisClient.keys(pattern);
		if (keys.length > 0) {
			await redisClient.del(keys);
			console.log(
				`🗑️  Cleared ${keys.length} cache entries matching: ${pattern}`
			);
		}
	} catch (error) {
		console.error("Clear cache error:", error);
	}
};

/**
 * Middleware to clear cache on property mutations
 */
const clearPropertyCache = async (req, res, next) => {
	// Store original methods
	const originalJson = res.json.bind(res);
	const originalSend = res.send.bind(res);

	// Override to clear cache after successful mutations
	const clearAfterResponse = (body) => {
		if (res.statusCode >= 200 && res.statusCode < 300) {
			clearCache("properties:*").catch((err) =>
				console.error("Error clearing cache:", err)
			);
		}
		return body;
	};

	res.json = (body) => {
		clearAfterResponse(body);
		return originalJson(body);
	};

	res.send = (body) => {
		clearAfterResponse(body);
		return originalSend(body);
	};

	next();
};

module.exports = {
	cacheProperties,
	clearCache,
	clearPropertyCache,
};
