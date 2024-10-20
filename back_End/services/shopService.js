
const Shop = require('../model/Shop');
const User = require('../model/User');
const mongoose = require('mongoose');

const createShop = async (data) => {
    const ownerId = new mongoose.Types.ObjectId(data.owner);
    try{
        const newShop = await Shop.create({
            "title": data.title,
            "description": data.description,
            "owner": ownerId,
            "price": data.price, // Assuming price is provided in the data
            "location": data.location,
            "propertyType": data.propertyType,
            "shopCategory": data.shopCategory,
            "leaseDuration": data.leaseDuration,
            "securityDeposit": data.securityDeposit
        })
        const user = await User.findOne({_id: ownerId}).exec();
        user.properties.push(newShop._id);
        user.save();
        return newShop;
    } catch (e) {
        return {error: e.message}
    }
};

const getShops = async (data) => {
    let page = parseInt(data.page) || 1;
    let limit = parseInt(data.limit) || 10;
    let skip = (page - 1) * limit;
    try {
        const shops = await Shop.find().populate('owner').skip(skip).limit(limit);
        const totalCount = await Shop.countDocuments();
        return {shops, page, totalCount}
    } catch (e) {
        return {error: e.message}
    }
};

const getShop = async (id) => {
    try {
        const shop = await Shop.findOne({_id:id}).populate('owner').exec();
        if(!shop) return {error: "Shop not found"};
        return shop;
    } catch (e) {
        return {error: e.message}
    }
};

const updateShop = async (id, data) => {
    try {
        const shop = await Shop.findOne({_id: id}).exec();
        if(!shop) return {error: "Shop not found"};
        if(data.title) shop.title = data.title;
        if(data.description) shop.description = data.description;
        if(data.location) shop.location = data.location;
        if(data.propertyType) shop.propertyType = data.propertyType;
        if(data.shopCategory) shop.shopCategory = data.shopCategory;
        if(data.rent) shop.rent = data.rent;
        if(data.leaseDuration) shop.leaseDuration = data.leaseDuration;
        if(data.securityDeposit) shop.securityDeposit = data.securityDeposit;
        const result = await shop.save();
        console.log(result);
        return result;
    } catch (e) {
        return {error: e.message}
    }
};

const deleteShop = async (id) => {
    try{
        const shop = await Shop.findOne({_id : id}).exec();
        if(!shop) return {error: "Shop not found"};
        const result = await shop.deleteOne();
        return result
    } catch (e) {
        return {error: e.message}
    }
};

const shopExists = async (title) => {
    try {
        const shop = await Shop.findOne({title}).exec();
        return shop;
    } catch (e) {
        return {error: e.message}
    }
};

const shopStatus = async (id, status) => {
    console.log(status)
    try {
        const shop = await Shop.findOne({ _id: id }).exec();
        if (!shop) return { error: "Shop not found" };
        shop.status = status
        const result = await shop.save();
        return { message: "Shop status updated successfully", shop: result };
    } catch (e) {
        return { error: e.message };
    }
};


module.exports = {
    createShop,
    getShops,
    getShop,
    updateShop,
    deleteShop,
    shopExists,
    shopStatus
}