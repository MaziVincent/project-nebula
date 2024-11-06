const {
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
  searchProperties
  //getPropertyByType
} = require("../services/propertyService");

const getPropertiesHandler = async (req, res) => {
  const data = {
    page: req.query.page,
    limit: req.query.limit,
    status: req.query.status,
  };
  const properties = await getProperties(data);
  if (!properties)
    return res.status(404).json({ message: "Properties not found" });
  return res.status(200).json(properties);
};

const getPropertiesByOwnerHandler = async (req, res) => {
  const data = {
    page: req.query.page,
    limit: req.query.limit,
    userId: req.params.id,
  };
  const properties = await getPropertiesByOwner(data);
  if (!properties)
    return res.status(404).json({ message: "Properties not found" });
  return res.status(200).json(properties);
};

const getPropertyHandler = async (req, res) => {
  if (!req.body) return res.status(400).json({ message: "No data provided" });
  const property = await getProperty(req.params.id);
  if (!property) return res.status(404).json({ message: "Property not found" });
  return res.status(200).json(property);
};

const deletePropertyHandler = async (req, res) => {
  if (!req.body) return res.status(400).json({ message: "No data provided" });
  const property = await deleteProperty(req.params.id);
  if (!property) return res.status(404).json({ message: "Property not found" });
  return res.status(200).json(property);
};

const propertyStatusHandler = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "Property ID required" });
  }
  const _id = req.params.id;
  const status = req.body.status;
  const result = await propertyStatus(_id, status);
  if (result.error) {
    return res.status(400).json({ message: result });
  }
  res.json({ message: "Property status updated successfully", data: result });
};

const getRecentPropertiesHandler = async (req, res) => {
  const properties = await getRecentProperties();
  if (!properties)
    return res.status(404).json({ message: "Properties not found" });
  return res.status(200).json(properties);
};

const uploadPropertyImageHandler = async (req, res) => {
  try {
    if (!req.files)
      return res
        .status(400)
        .json({ status: "error", message: "Missing files" });
    const files = req.files;
    const _id = req.params.id;
    // console.log(_id)
    const result = await uploadPropertyImage(files, _id);
    // console.log(result)
    return res.status(200).json({ message: result });
  } catch (error) {
    // console.log("Hello");
    // console.log(error);
    return res.status(500).json({ error: error });
  }
};

const getPropertiesByTypeHandler = async (req, res) => {
  const data = {
    page: req.query.page,
    limit: req.query.limit,
    type: req.query.type,
  };

  const properties = await getPropertiesByType(data);
  if (!properties)
    return res.status(404).json({ message: "Properties not found" });
  return res.status(200).json(properties);
};

const setFeaturedPropertyHandler = async (req, res) => {
  const _id = req.params.id;
  const featured = req.body.featured;
  const data = { _id, featured };


  try {
    const result = await handleFeaturedProperty(data);
    if (result.error) {
      return res.status(404).json( result );
    }

    res.status(200).json( result );
  } catch (err) {
    res.status(400).json(err);
  }
};

const getFeaturedPropertiesHandler = async (req, res) => {
  try {
    const featuredProperties = await getFeaturedProperties();
    if (featuredProperties.error) {
      return res.status(404).json({ message: "Properties not found" });
    }
    res.status(200).json(featuredProperties);
  } catch (err) {
    res.status(400).json(err);
  }
};

const searchPropertiesHandler = async (req, res) => {
  const data = {
    page: req.query.page,
    limit: req.query.limit,
    search: req.query.search,
  };
  const properties = await searchProperties(data);
if (!properties)
    return res.status(404).json({ message: "Properties not found" });
  return res.status(200).json(properties);
};
// const getPropertyByTypeHandler = async (req, res) => {
//   const propertyType = req.body
//   const properties = await getPropertyByType(propertyType)
//   if(!properties) return res.status(404).json({message: 'Properties not found'})
//   return res.status(200).json(properties)
// };

module.exports = {
  getPropertiesHandler,
  getPropertiesByOwnerHandler,
  getPropertyHandler,
  deletePropertyHandler,
  propertyStatusHandler,
  getRecentPropertiesHandler,
  uploadPropertyImageHandler,
  getPropertiesByTypeHandler,
  setFeaturedPropertyHandler,
  getFeaturedPropertiesHandler,
  searchPropertiesHandler,
  // getPropertyByTypeHandler
};
