const mongoose = require('mongoose');
const House = require('../model/House');
const User = require('../model/User');

const createHouse = async (data) => {
    const ownerId = new mongoose.Types.ObjectId(data.owner);
    // const files1 = data.files['images'] || [];
    // const files2 = data.files['docImages'] || [];

    // const imageNames = files1.map(file => file.path);
    // const docImageNames = files2.map(file => file.path);

    // const images = JSON.stringify(imageNames)
    // const docImages = JSON.stringify(docImageNames)
    // Use data.exteriorFeatures here
    const exteriorFeaturesArray = data.exteriorFeatures ? data.exteriorFeatures.split(', ') : [];
    const interiorFeaturesArray = data.interiorFeatures ? data.interiorFeatures.split(', ') : [];
    const livingRoomFeaturesArray = data.livingRoomFeatures ? data.livingRoomFeatures.split(', ') : [];
    const kitchenFeaturesArray = data.kitchenFeatures ? data.kitchenFeatures.split(', ') : [];

    try {
        const newHouse = await House.create({
            title: data.title,
            description: data.description,
            price: data.price,
            location: data.location,
            owner: ownerId,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            squareFootage: data.squareFootage,
            yearBuilt: data.yearBuilt,
            lotSize: data.lotSize,
            stories: data.stories,
            docType: data.docType,
            propertyType: data.propertyType,
            livingRoomFeatures: livingRoomFeaturesArray,
            exteriorFeatures: exteriorFeaturesArray,
            interiorFeatures: interiorFeaturesArray,
            kitchenFeatures: kitchenFeaturesArray,
        });

        const user = await User.findOne({ _id: ownerId }).exec();
        user.properties.push(newHouse._id);
        await user.save();

        return newHouse;
    } catch (e) {
        return { error: e.message };
    }
};


const getHouses = async (data) => {
    let page = parseInt(data.page) || 1;
    let limit = parseInt(data.limit) || 10;
    let skip = (page - 1) * limit;
    try {
        const houses = await House.find().populate('owner').skip(skip).limit(limit);
        const totalCount = await House.countDocuments();
        return {houses, page, totalCount}
    } catch (e) {
        return {error: e.message}
    }
};

const getHouse = async (id) => {
    try{
        const house = await House.findOne({_id : id}).populate('owner').exec();
        if(!house) return {error: "House not found"};
        return house;
    } catch (e) {
        return {error: e.message}
    }
};

const updateHouse = async (id, data) => {
    try {
        const house = await House.findOne({_id : id}).exec();
        if(!house) return {error: "House not found"};
        if(data.title) house.title = data.title
        if(data.description) house.description = data.description
        if(data.price) house.price = data.price
        if(data.location) house.location = data.location
        if(data.bedrooms) house.bedrooms = data.bedrooms
        if(data.bathrooms) house.bathrooms = data.bathrooms
        if(data.squareFootage) house.squareFootage = data.squareFootage
        if(data.yearBuilt) house.yearBuilt = data.yearBuilt
        if(data.lotSize) house.lotSize = data.lotSize
        if(data.stories) house.stories = data.stories
        if(data.propertyType) house.propertyType = data.propertyType
        if(data.exteriorFeatures) house.exteriorFeatures = data.exteriorFeatures
        if(data.interiorFeatures) house.interiorFeatures = data.interiorFeatures
        if(data.livingRoomFeatures) house.livingRoomFeatures = data.livingRoomFeatures
        if(data.kitchenFeatures) house.kitchenFeatures = data.kitchenFeatures
        await house.save();
        return house;
    } catch (e) {
        return {error: e.message}
    }
};

const deleteHouse = async (id) => {
    try{
        const house = await House.findOne({_id : id}).exec();
        if(!house) return {error: "House not found"};
        const result = await house.deleteOne();
        return result
    } catch (e) {
        return {error: e.message}
    }
};

const houseExists = async (title) => {
    try {
        const house = await House.findOne({title}).exec();
        return house;
    } catch (e) {
        return {error: e.message}
    }
};

const houseStatus = async (id, status) => {
    console.log(status)
    try {
        const house = await House.findOne({ _id: id }).exec();
        if (!house) return { error: "House not found" };
        house.status = status
        const result = await house.save();
        return { message: "House status updated successfully", house: result };
    } catch (e) {
        return { error: e.message };
    }
};

module.exports = {
    createHouse, 
    getHouses, 
    getHouse, 
    updateHouse, 
    deleteHouse, 
    houseExists,
    houseStatus
}