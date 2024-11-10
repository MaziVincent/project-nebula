const Apartment = require('../model/Apartment');
const User = require('../model/User');
const mongoose = require('mongoose');

const createApartment = async (data) => {
    const ownerId = new mongoose.Types.ObjectId(data.owner);
    const imageName = data.file ? data.file.path : null;
    const images = JSON.stringify(imageName);
    
    try{
        const newApartment = await Apartment.create({
            "title": data.title,
            "description": data.description,
            "price": data.price,
            "location": data.location,
            "images": images, // Assuming image is a file path
            "owner": ownerId,
            "bedrooms": data.bedrooms,
            "bathrooms": data.bathrooms,
            "floorArea": data.floorArea,
            "propertyType": data.propertyType,
            "paymentType" : data.paymentType,
            "livingRoomFeatures": data.livingRoomFeatures,
            "exteriorFeatures": data.exteriorFeatures,
            "interiorFeatures": data.interiorFeatures,
            "kitchenFeatures": data.kitchenFeatures,
            "searchString": `${data.title} ${data.price} ${data.location} ${data.propertyType} ${data.floorArea}`
        })
        const user = await User.findOne({_id: ownerId }).exec();
        user.properties.push(newApartment._id);
        user.save();
        return newApartment;
    } catch (e) {
        return {error: e.message}
    }
};

const getApartments = async (data) => {
        let page = parseInt(data.page) || 1;
        let limit = parseInt(data.limit) || 10;
        let skip = (page - 1) * limit
    try{
        const apartments = await Apartment.find().populate('owner').skip(skip).limit(limit).exec();
        const totalCount = await Apartment.countDocuments();
        return {apartments, page, totalCount};
    } catch (e) {
        return {error: e.message}
    }
};

const getApartment = async (id) => {
    try{
        const apartment = await Apartment.findOne({_id : id}).populate('owner').exec();
        if(!apartment) return {error: "Apartment not found"};
        return apartment;
    } catch (e) {
        return {error: e.message}
    }
};

const updateApartment = async (id, data) => {
    
    try {
        const apartment = await Apartment.findOne({_id : id}).exec();
        if(!apartment) return {error: "Apartment not found"};
        if(data.title) apartment.title = data.title
        if(data.description) apartment.description = data.description
        if(data.price) apartment.price = data.price
        if(data.location) apartment.location = data.location
        // if(data.image) apartment.image = data.image
        if(data.bedrooms) apartment.bedrooms = data.bedrooms
        if(data.bathrooms) apartment.bathrooms = data.bathrooms
        if(data.floorArea) apartment.floorArea = data.floorArea
        if(data.propertyType) apartment.propertyType = data.propertyType
        if(data.paymentType) apartment.paymentType = data.paymentType 
        if(data.interiorFeatures) apartment.interiorFeatures = data.interiorFeatures 
        if(data.exteriorFeatures) apartment.exteriorFeatures = data.exteriorFeatures 
        if(data.livingRoomFeatures) apartment.livingRoomFeatures = data.livingRoomFeatures 
        if(data.kitchenFeatures) apartment.kitchenFeatures = data.kitchenFeatures 

        const result = await apartment.save();
        return result;

    } catch (e) {
        return {error: e.message}
    }
};


const deleteApartment = async (id) => {
    try {
        const apartment = await Apartment.findOne({_id : id}).exec();
        if(!apartment) return {error: "Apartment not found"};
        const result = await apartment.deleteOne();
        return result;
    } catch (e) {
        return {error: e.message}
    }
};

const apartmentExists = async (title) => {
    try {
        const apartment = await Apartment.findOne({title: title}).exec();
        return apartment;
    } catch (e) {
        return {error: e.message}
    }
};

const apartmentStatus = async (id, status) => {
    console.log(status)
    try {
        const apartment = await Apartment.findOne({ _id: id }).exec();
        if (!apartment) return { error: "Apartment not found" };
        apartment.status = status
        const result = await apartment.save();
        return { message: "Shop status updated successfully", apartment: result };
    } catch (e) {
        return { error: e.message };
    }
};
module.exports = {
    createApartment,
    getApartments,
    getApartment,
    updateApartment,
    deleteApartment,
    apartmentExists,
    apartmentStatus
}