const {
    getProperties,
    getPropertiesByOwner,
    getProperty,
    deleteProperty,
    getRecentProperties,
    propertyStatus,
    uploadPropertyImage
} = require('../services/propertyService')

const getPropertiesHandler = async (req, res) => {
  const data = {
    page: req.query.page,
    limit: req.query.limit,
  }
  const properties = await getProperties(data)
  if(!properties) return res.status(404).json({message: 'Properties not found'})
  return res.status(200).json(properties)
};

const getPropertiesByOwnerHandler = async (req, res) => {
  const data = {
    page: req.query.page,
    limit: req.query.limit,
    userId: req.params.id
  }
  const properties = await getPropertiesByOwner(data)
  if(!properties) return res.status(404).json({message: 'Properties not found'})
  return res.status(200).json(properties)
};

const getPropertyHandler = async (req, res) => {
  if(!req.body) return res.status(400).json({message: 'No data provided'})
  const property = await getProperty(req.params.id);
  if(!property) return res.status(404).json({message: 'Property not found'})
  return res.status(200).json(property)
};

const deletePropertyHandler = async (req, res) => {
  if(!req.body) return res.status(400).json({message: 'No data provided'})
  const property = await deleteProperty(req.params.id);
  if(!property) return res.status(404).json({message: 'Property not found'})
  return res.status(200).json(property)
};

const propertyStatusHandler = async (req, res) => {
  if(!req.params.id) {
      return res.status(400).json({message: 'Property ID required'})
  }
  const _id = req.params.id
  const status = req.body.status
  const result = await propertyStatus(_id, status);
  if(result.error) {
      return res.status(400).json({message: result})
  }
  res.json({message: 'Property status updated successfully', data: result})
};


const getRecentPropertiesHandler = async (req, res) => {
  
  const properties = await getRecentProperties();
  if(!properties) return res.status(404).json({message: 'Properties not found'})
  return res.status(200).json(properties)
};

const uploadPropertyImageHandler = async (req, res) => {
  try{
    if(!req.files) return res.status(400).json({status: "error", message: "Missing files"})
    const files = req.files
    const _id = req.params.id
    // console.log(_id)
    const result = await uploadPropertyImage(files, _id);
    console.log(result)
    return res.status(200).json({message : result})
  } catch (error) {
    console.log("Hello");
    console.log(error);
    return res.status(500).json({error: error})
  }
};

module.exports = {
  getPropertiesHandler,
  getPropertiesByOwnerHandler,
  getPropertyHandler,
  deletePropertyHandler,
  propertyStatusHandler,
  getRecentPropertiesHandler,
  uploadPropertyImageHandler
}