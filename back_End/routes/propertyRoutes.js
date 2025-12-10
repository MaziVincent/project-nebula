const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const verifyRoles = require("../middleware/verifyRoles");
const filesPayloadExists = require("../middleware/filesPayloadExists");
const fileExtLimiter = require("../middleware/fileExtLimiter");
const filesSizeLimiter = require("../middleware/filiesSizeLimiter");
const { cacheProperties, clearPropertyCache } = require("../middleware/cache");

// Cache GET requests for 5 minutes (300 seconds)
router
	.route("/")
	.get(cacheProperties(300), propertyController.getPropertiesHandler);

router
	.route("/owner/:id")
	.get(cacheProperties(300), propertyController.getPropertiesByOwnerHandler);

router
	.route("/type")
	.get(cacheProperties(300), propertyController.getPropertiesByTypeHandler);

router
	.route("/status/:id")
	.put(clearPropertyCache, propertyController.propertyStatusHandler);

router
	.route("/featured")
	.get(cacheProperties(300), propertyController.getFeaturedPropertiesHandler);

router
	.route("/featured/:id")
	.put(clearPropertyCache, propertyController.setFeaturedPropertyHandler);

router
	.route("/search")
	.get(cacheProperties(180), propertyController.searchPropertiesHandler);
router
	.route("/upload/:id")
	.put(
		fileUpload({ createParentPath: true }),
		filesPayloadExists,
		fileExtLimiter([".png", ".jpg", ".jpeg", ".webp"]),
		filesSizeLimiter,
		clearPropertyCache,
		propertyController.uploadPropertyImageHandler
	);

router
	.route("/image/:id")
	.delete(clearPropertyCache, propertyController.deleteImageHandler);

router
	.route("/:id")
	.get(cacheProperties(600), propertyController.getPropertyHandler)
	.delete(clearPropertyCache, propertyController.deletePropertyHandler);

module.exports = router;
