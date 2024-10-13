const Land = require('../model/Land')
const mongoose = require('mongoose')
const User = require('../model/User')

const createLand = async (data) => {
    const ownerId = new mongoose.Types.ObjectId(data.owner);
    const files1 = data.files['images'] || [];
    const files2 = data.files['docImages'] || [];

    const imageNames = files1.map(file => file.path);
    const docImageNames = files2.map(file => file.path);
    // const imageName = JSON.stringify(imageNames);
    // const docImageName = JSON.stringify(docImageNames);
    try{
        const newLand = await Land.create({
            "title": data.title,
            "description": data.description,
            "price": data.price,
            "location": data.location,
            "images": imageNames,
            "owner": ownerId,
            "plots": data.plots,
            "docType": data.docType,
            "docImages": docImageNames,
            "ownershipType": data.ownershipType
        })
        const user = await User.findOne({_id : ownerId }).exec();
        user.properties.push(newLand._id);
        user.save();
        return newLand;
    } catch (e) {
        return {error: e.message}
    }
};

const getLands = async (data) => {
    let page = parseInt(data.page) || 1;
    let limit = parseInt(data.limit) || 10;
    let skip = (page - 1) * limit;
    try {
        const lands = await Land.find().populate('owner').skip(skip).limit(limit);
        const totalCount = await Land.countDocuments();
        return {lands, page, totalCount}
    } catch (e) {
        return {error: e.message}
    }
};

const getLand = async (id) => {
    try{
        const land = await Land.findOne({_id : id}).populate('owner').exec();
        if(!land) return {error: "Land not found"};
        return land;
    } catch (e) {
        return {error: e.message}
    }
};

const updateLand = async (id, data) => {
    try {
        const land = await Land.findOne({_id : id}).exec();
        if(!land) return {error: "Land not found"};
        if(data.title) land.title = data.title
        if(data.description) land.description = data.description
        if(data.price) land.price = data.price
        if(data.location) land.location = data.location
        if(data.image) land.image = data.image
        if(data.plots) land.plots = data.plots
        if(data.docType) land.docType = data.docType
        if(data.docImage) land.docImage = data.docImage
        if(data.ownershipType) land.ownershipType = data.ownershipType
        const result = await land.save();
        return result;
    } catch (e) {
        return {error: e.message}
    }
};

const deleteLand = async (id) => {
    try{
        const land = await Land.findOne({_id : id}).exec();
        if(!land) return {error: "Land not found"};
        const result = await land.deleteOne();
        return result
    } catch (e) {
        return {error: e.message}
    }
};

const landExists = async (title) => {
    try {
        const land = await Land.findOne({title}).exec();
        return land;
    } catch (e) {
        return {error: e.message}
    }
}

const landStatus = async (id, status) => {
    try {
        const land = await Land.findOne({ _id: id }).exec();
        if (!land) return { error: "Land not found" };
        land.status = status;
        const result = await land.save();
        return result;
    } catch (e) {
        return { error: e.message };
    }
};

module.exports = {
    createLand, 
    getLands, 
    getLand, 
    updateLand, 
    deleteLand, 
    landExists,
    landStatus
}