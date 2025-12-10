import axios from "axios";

const useUpdate = () => {
	const updateData = async (url, data, token) => {
		const controller = new AbortController(); // Define controller inside the function
		let result;

		try {
			const response = await axios.put(url, data, {
				signal: controller.signal,
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				withCredentials: true,
			});

			result = response;
		} catch (error) {
			return { success: false, error: error.message || error }; // Standardized error response
		}

		return result;
	};

	return updateData;
};

export default useUpdate;
