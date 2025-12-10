/**
 * Centralized Error Handler Utility
 * Provides consistent error handling across the application
 */

/**
 * Handle API errors and return user-friendly messages
 * @param {Error} error - The error object from axios or fetch
 * @returns {string} User-friendly error message
 */
export const handleApiError = (error) => {
	// Network errors (no response from server)
	if (!error.response) {
		if (error.message === "Network Error") {
			return "Network error. Please check your internet connection.";
		}
		if (error.code === "ECONNABORTED") {
			return "Request timeout. Please try again.";
		}
		return error.message || "Something went wrong. Please try again.";
	}

	// HTTP errors (response from server)
	const { status, data } = error.response;

	switch (status) {
		case 400:
			return data?.message || "Invalid request. Please check your input.";
		case 401:
			return data?.message || "Authentication required. Please login.";
		case 403:
			return data?.message || "Access denied. You don't have permission.";
		case 404:
			return data?.message || "Resource not found.";
		case 409:
			return data?.message || "Conflict. Resource already exists.";
		case 422:
			return data?.message || "Validation error. Please check your input.";
		case 429:
			return "Too many requests. Please try again later.";
		case 500:
			return "Server error. Please try again later.";
		case 502:
			return "Bad gateway. Server is temporarily unavailable.";
		case 503:
			return "Service unavailable. Please try again later.";
		default:
			return data?.message || `Error ${status}. Please try again.`;
	}
};

/**
 * Extract validation errors from API response
 * @param {Error} error - The error object
 * @returns {Object} Validation errors object
 */
export const getValidationErrors = (error) => {
	if (error.response?.data?.errors) {
		return error.response.data.errors;
	}
	return {};
};

/**
 * Check if error is a network error
 * @param {Error} error - The error object
 * @returns {boolean}
 */
export const isNetworkError = (error) => {
	return !error.response && error.message === "Network Error";
};

/**
 * Check if error is an authentication error
 * @param {Error} error - The error object
 * @returns {boolean}
 */
export const isAuthError = (error) => {
	return error.response?.status === 401 || error.response?.status === 403;
};

/**
 * Check if error is a validation error
 * @param {Error} error - The error object
 * @returns {boolean}
 */
export const isValidationError = (error) => {
	return error.response?.status === 422 || error.response?.status === 400;
};

/**
 * Log error in development mode
 * @param {Error} error - The error object
 * @param {string} context - Context where error occurred
 */
export const logError = (error, context = "") => {
	if (import.meta.env.DEV) {
		console.error(`[Error${context ? ` in ${context}` : ""}]:`, error);
		if (error.response) {
			console.error("Response data:", error.response.data);
			console.error("Response status:", error.response.status);
		}
	}
};

export default {
	handleApiError,
	getValidationErrors,
	isNetworkError,
	isAuthError,
	isValidationError,
	logError,
};
