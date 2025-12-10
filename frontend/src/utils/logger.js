/**
 * Environment-aware logging utility
 * Logs only appear in development mode
 */

const isDevelopment = import.meta.env.DEV;

const logger = {
	log: (...args) => {
		if (isDevelopment) {
			console.log(...args);
		}
	},

	error: (...args) => {
		if (isDevelopment) {
			console.error(...args);
		}
	},

	warn: (...args) => {
		if (isDevelopment) {
			console.warn(...args);
		}
	},

	info: (...args) => {
		if (isDevelopment) {
			console.info(...args);
		}
	},

	debug: (...args) => {
		if (isDevelopment && import.meta.env.VITE_ENABLE_DEBUG === "true") {
			console.debug(...args);
		}
	},
};

export default logger;
