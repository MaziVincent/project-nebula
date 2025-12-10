import { useCallback } from "react";

/**
 * Custom hook for handling feature arrays in property forms
 * @returns {Object} Utility functions for feature handling
 */
const useFeatureFormData = () => {
	/**
	 * Appends feature arrays to FormData object
	 * @param {FormData} formData - The FormData object to append to
	 * @param {Object} data - The form data containing features
	 */
	const appendFeaturesToFormData = useCallback((formData, data) => {
		const featureKeys = [
			"exteriorFeatures",
			"interiorFeatures",
			"kitchenFeatures",
			"livingRoomFeatures",
			"landFeatures",
		];

		for (const key in data) {
			if (featureKeys.includes(key) && Array.isArray(data[key])) {
				data[key].forEach((feature) => {
					formData.append(`${key}[]`, feature);
				});
			} else {
				formData.append(key, data[key]);
			}
		}

		return formData;
	}, []);

	return { appendFeaturesToFormData };
};

export default useFeatureFormData;
