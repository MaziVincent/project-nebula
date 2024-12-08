const {
    createShop,
    updateShop,
    deleteShop,
    getShop,
    getShops,
    shopExists,
    shopStatus
} = require('../services/shopService')

const createShopHandler = async (req, res) => {
    console.log(req.body);
    const { title, description, price, location, owner, propertyType, shopCategory, leaseDuration, securityDeposit, videoUrl} = req.body;
    if (!title, !description, !price, !location, !owner, !propertyType, !shopCategory, !leaseDuration, !securityDeposit ) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const duplicate = await shopExists(title);
    if (duplicate) {
        return res.status(409).json({ message: 'Shop already exists' });
    }
    // const image = req.file ? req.file.path : null;
    const data = {
        title,
        description,
        price,
        location,
        owner,
        propertyType,
        shopCategory,
        leaseDuration,
        securityDeposit,
        videoUrl,
        file: req.file
    };
    const result = await createShop(data);
    if (result.error) {
        return res.status(400).json({ message: result });
    }
    res.status(201).json({success: 'New shop created', result});
    // console.log(result);
};

const getShopsHandler = async (req, res) => {
    const data = {
        page: req.query.page,
        limit: req.query.limit
    }
    const shops = await getShops(data);
    if(!shops) {
        return res.status(404).json({message: 'No shop found'})
    }
    res.json(shops)
};

const getShopHandler = async (req, res) => {
   if(!req.params.id) {
    return res.status(400).json({message: 'Shop ID required'})
   }
   const shop = await getShop(req.params.id);
   if(!shop) {
    return res.status(404).json({message: 'No shop found'})
   }
   res.json(shop)
};

const updateShopHandler = async (req, res) => {
    if(!req.body) {
        return res.status(400).json({ message: 'Data to update required' });
    }
    console.log(req.body);
    const result = await updateShop(req.body._id, req.body);
    if(result.error) {
        return res.status(400).json({message: result})
    }
    console.log(result);
    res.json({message: 'Shop updated successfully', data: result})
};

const deleteShopHandler = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({message: 'Shop ID required'})
    }
    const result = await deleteShop(req.params.id);
    if(result.error) {
        return res.status(400).json({message: result})
    }
    res.json({message: 'Shop deleted successfully', data: result})
};

const shopStatusHandler = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({message: 'Shop ID required'})
    }
    const _id = req.params.id
    const status = req.body.status
    const result = await shopStatus(_id, status);
    if(result.error) {
        return res.status(400).json({message: result})
    }
    res.json({message: 'Shop status updated successfully', data: result})
};

module.exports = {
    createShopHandler,
    getShopsHandler,
    getShopHandler,
    updateShopHandler,
    deleteShopHandler,
    shopStatusHandler
}