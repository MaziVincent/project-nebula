const Property = require("../model/Property");
const User = require("../model/User");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const sharp = require("sharp");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
const getProperties = async (data) => {
	let page = parseInt(data.page) || 1;
	let limit = parseInt(data.limit) || 6;
	let status = data.status;
	let skip = (page - 1) * limit;
	try {
		const query = status ? { status } : {};
		const properties = await Property.find(query)
			.sort({ createdAt: -1 })
			.populate("owner")
			.skip(skip)
			.limit(limit)
			.exec();

		const totalCount = await Property.countDocuments(query);
		return { properties, page, totalPage: Math.ceil(totalCount / limit) };
	} catch (e) {
		return { error: e.message };
	}
};

const getPropertiesByOwner = async (data) => {
	let page = parseInt(data.page) || 1;
	let limit = parseInt(data.limit) || 10;
	let skip = (page - 1) * limit;
	const userId = data.userId;
	try {
		const properties = await Property.find({ owner: userId })
			.sort({ createdAt: -1 })
			.populate("owner")
			.skip(skip)
			.limit(limit)
			.exec();
		const totalCount = await Property.countDocuments();
		return { properties, page, totalPage: Math.ceil(totalCount / limit) };
	} catch (e) {
		return { error: e.message };
	}
};
const getProperty = async (id) => {
	try {
		const property = await Property.findOne({ _id: id })
			.populate("owner")
			.exec();
		if (!property) return { error: "Property not found" };
		return property;
	} catch (e) {
		return { error: e.message };
	}
};

const deleteProperty = async (id) => {
	try {
		const property = await Property.findOne({ _id: id }).exec();
		if (!property) return { error: "Property not found" };
		const result = await property.deleteOne({ _id: id }).exec();
		return { message: "Property deleted successfully", result };
	} catch (e) {
		return { error: e.message };
	}
};

const propertyStatus = async (id, status) => {
	//console.log(status);
	try {
		const property = await Property.findOne({ _id: id }).exec();
		if (!property) return { error: "Property not found" };
		property.status = status;
		const result = await property.save();
		return {
			message: "Property status updated successfully",
			property: result,
		};
	} catch (e) {
		return { error: e.message };
	}
};

const getRecentProperties = async () => {
	const limit = 10;
	try {
		const properties = await Property.find()
			.sort({ createdAt: -1 })
			.limit(limit)
			.populate("owner")
			.exec();
		return properties;
	} catch (e) {
		return { error: e.message };
	}
};

const uploadPropertyImage = async (files, id) => {
	const propertyId = new mongoose.Types.ObjectId(id);

	const uploadPromises = Object.keys(files).map(async (key) => {
		const file = files[key];

		return new Promise(async (resolve, reject) => {
			const compressedBuffer = await sharp(file.data)
				.resize({
					width: 1200,
					height: 1200,
					fit: "inside",
					withoutEnlargement: true,
				})
				.webp({ quality: 80, nearLossless: true })
				.toBuffer();

			const uploadStream = cloudinary.uploader.upload_stream(
				{
					folder: "RealEstate",
				},
				async (error, result) => {
					if (error) {
						return reject(error);
					}

					try {
						const property = await Property.findById({
							_id: propertyId,
						}).exec();

						if (property == null) {
							return { error: "Property not found" };
						}
						property.imageUrls.push(result.secure_url);
						await property.save();
						resolve("File Uploaded Successfully to DB");
					} catch (err) {
						console.log(err);

						reject(err);
					}
				}
			);
			uploadStream.end(compressedBuffer);
		});
	});

	return Promise.all(uploadPromises);
};

const getPropertiesByType = async (data) => {
	let page = parseInt(data.page) || 1;
	let limit = parseInt(data.limit) || 6;
	let type = data.type || "Rent";
	let skip = (page - 1) * limit;
	try {
		const properties = await Property.find({
			propertyType: type,
			status: "Available",
		})
			.populate("owner")
			.skip(skip)
			.limit(limit)
			.exec();
		const totalCount = await Property.countDocuments();
		return { properties, page, totalPage: Math.ceil(totalCount / limit) };
	} catch (e) {
		return { error: e.message };
	}
};

const handleFeaturedProperty = async (data) => {
	const property = await Property.findById(data._id).exec();
	if (!property) return { error: "Property not found" };

	property.isFeaturedProperty = data.featured;
	await property.save();
	return { message: "Property made Featured successfully" };
};

const getFeaturedProperties = async () => {
	try {
		const properties = await Property.find({ isFeaturedProperty: true }).exec();
		if (!properties) return { error: "Properties not found" };
		return properties;
	} catch (e) {
		return { error: e.message };
	}
};

const searchProperties = async (data) => {
	let page = parseInt(data.page) || 1;
	let limit = parseInt(data.limit) || 6;
	let skip = (page - 1) * limit;
	let search = data.search || "";
	try {
		const properties = await Property.find({
			$or: [
				{ title: { $regex: search, $options: "i" } },
				{ description: { $regex: search, $options: "i" } },
				{ location: { $regex: search, $options: "i" } },
				{ propertyType: { $regex: search, $options: "i" } },
			],
		})
			.populate("owner")
			.skip(skip)
			.limit(limit)
			.exec();
		const totalCount = await Property.countDocuments();
		return { properties, page, totalPage: Math.ceil(totalCount / limit) };
	} catch (e) {
		return { error: e.message };
	}
};
// const getPropertyByType = async (propertyType) => {
//     try {
//         const properties = await Property.find({ propertyType: propertyType }).populate('owner').exec();
//         if (!properties) return { error: "Properties not found" };
//         return properties;
//     } catch (e) {
//         return { error: e.message };
//     }
// };

// Utility function to extract Cloudinary public ID from secure_url
const getPublicIdFromUrl = (secureUrl) => {
	const regex = /\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z]+$/;
	const match = secureUrl.match(regex);
	return match ? match[1] : null;
};

const deletePropertyImage = async (id, imageUrl) => {
	try {
		// Fetch the property by ID
		const property = await Property.findById(id);
		if (!property) {
			return res.status(404).json({ message: "Property not found." });
		}

		// Find the image URL in the imageUrls array
		const imageIndex = property.imageUrls.findIndex((url) => url === imageUrl);
		if (imageIndex === -1) {
			return { error: 404, message: "Image URL not found in property." };
		}

		// Extract the Cloudinary public ID
		const publicId = getPublicIdFromUrl(imageUrl);
		if (!publicId) {
			return { error: 404, message: "Invalid Cloudinary URL." };
		}

		// Delete the image from Cloudinary
		await cloudinary.uploader.destroy(publicId);

		// Remove the image URL from the imageUrls array
		property.imageUrls.splice(imageIndex, 1);
		await property.save();

		return { success: true, message: "Image deleted successfully." };
	} catch (error) {
		console.error("Error deleting image:", error);
		throw error;
	}
};

module.exports = {
	getProperties,
	getPropertiesByOwner,
	getProperty,
	deleteProperty,
	getRecentProperties,
	propertyStatus,
	uploadPropertyImage,
	getPropertiesByType,
	handleFeaturedProperty,
	getFeaturedProperties,
	searchProperties,
	deletePropertyImage,
	//getPropertyByType
};
