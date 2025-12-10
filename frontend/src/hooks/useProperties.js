import { useQuery } from "react-query";
import baseURL from "../shared/baseURL";

/**
 * Custom hook for fetching properties with pagination
 * @param {Object} options - Query options
 * @param {number} options.page - Current page number
 * @param {number} options.limit - Items per page
 * @param {string} options.status - Property status filter
 * @param {string} options.type - Property type filter
 * @param {string} options.listingType - Listing type (Rent/Sell)
 * @returns {Object} React Query result object
 */
export const useProperties = (options = {}) => {
	const {
		page = 1,
		limit = 6,
		status = "",
		type = "",
		listingType = "",
		queryKey = "properties",
	} = options;

	const getProperties = async () => {
		let url = `${baseURL}properties`;

		// Build query string based on options
		if (listingType) {
			url += `/type?page=${page}&limit=${limit}`;
			if (listingType !== "all") {
				url += `&type=${listingType}`;
			}
		} else {
			url += `?page=${page}&limit=${limit}`;
		}

		if (status) {
			url += `&status=${status}`;
		}

		if (type) {
			url += `&propertyType=${type}`;
		}

		const response = await fetch(url);

		if (!response.ok) {
			throw new Error("Failed to fetch properties");
		}

		return response.json();
	};

	return useQuery([queryKey, page, status, type, listingType], getProperties, {
		keepPreviousData: true,
		staleTime: 10000,
		refetchOnMount: "always",
		retry: 2,
	});
};

/**
 * Custom hook for fetching a single property by ID
 * @param {string} id - Property ID
 * @returns {Object} React Query result object
 */
export const useProperty = (id) => {
	const url = `${baseURL}properties/${id}`;

	const getProperty = async () => {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error("Failed to fetch property");
		}

		const data = await response.json();
		return data.data;
	};

	return useQuery(["property", id], getProperty, {
		enabled: !!id,
		staleTime: 30000,
		retry: 2,
	});
};

/**
 * Custom hook for fetching featured properties
 * @param {number} limit - Number of featured properties to fetch
 * @returns {Object} React Query result object
 */
export const useFeaturedProperties = (limit = 6) => {
	const url = `${baseURL}properties/featured?limit=${limit}`;

	const getFeaturedProperties = async () => {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error("Failed to fetch featured properties");
		}

		return response.json();
	};

	return useQuery(["featuredProperties", limit], getFeaturedProperties, {
		staleTime: 60000,
		retry: 2,
	});
};

export default useProperties;
