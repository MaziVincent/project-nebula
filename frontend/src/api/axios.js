import axios from "axios";
import baseURL from "../shared/baseURL";

// Default timeout in milliseconds (10 seconds)
const DEFAULT_TIMEOUT = 10000;

export default axios.create({
	baseURL: baseURL,
	timeout: DEFAULT_TIMEOUT,
});

export const axiosPrivate = axios.create({
	baseURL: baseURL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
	timeout: DEFAULT_TIMEOUT,
});

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

/**
 * Check if error is retryable
 * @param {Error} error - Axios error object
 * @returns {boolean}
 */
const isRetryableError = (error) => {
	if (!error.response) {
		// Network errors are retryable
		return true;
	}

	// Retry on 5xx errors and 429 (Too Many Requests)
	const status = error.response.status;
	return status >= 500 || status === 429 || status === 408;
};

/**
 * Delay execution
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise}
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Axios retry interceptor
 */
axiosPrivate.interceptors.response.use(
	(response) => response,
	async (error) => {
		const config = error.config;

		// Initialize retry count if not exists
		if (!config.__retryCount) {
			config.__retryCount = 0;
		}

		// Check if we should retry
		if (
			config.__retryCount < MAX_RETRIES &&
			isRetryableError(error) &&
			!config.__isRetry // Prevent infinite loops
		) {
			config.__retryCount += 1;
			config.__isRetry = true;

			// Wait before retrying (exponential backoff)
			const delayTime = RETRY_DELAY * Math.pow(2, config.__retryCount - 1);
			await delay(delayTime);

			return axiosPrivate(config);
		}

		return Promise.reject(error);
	}
);
