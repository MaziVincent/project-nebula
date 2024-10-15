const Property = require('../model/Property');
const User = require('../model/User');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const getProperties = async (data) => {
    let page = parseInt(data.page) || 1;
    let limit = parseInt(data.limit) || 6;
    let skip = (page - 1) * limit;
    try {
        const properties = await Property.find().populate('owner').skip(skip).limit(limit).exec();
        const totalCount = await Property.countDocuments();
        return { properties, page, totalPage:Math.ceil(totalCount/limit) };
    } catch (e) {
        return { error: e.message };
    }
};

getPropertiesByOwner = async(data) => {
    let page = parseInt(data.page) || 1;
    let limit = parseInt(data.limit) || 6;
    let skip = (page - 1) * limit;
    const userId = data.userId;
    try {
        const properties = await Property.find({owner: userId}).populate('owner').skip(skip).limit(limit).exec();
        const totalCount = await Property.countDocuments();
        return {properties, page, totalPage:Math.ceil(totalCount/limit)};
    } catch (e) {
        return {error: e.message}
    }
}
const getProperty = async (id) => {
    try {
        const property = await Property.findOne({ _id: id }).populate('owner').exec();
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
        return { message: "Property deleted successfully", result};
    } catch (e) {
        return { error: e.message };
    }
};

const propertyStatus = async (id, status) => {
    console.log(status)
    try {
        const property = await Property.findOne({ _id: id }).exec();
        if (!property) return { error: "Property not found" };
        property.status = status
        const result = await property.save();
        return { message: "Property status updated successfully", property: result };
    } catch (e) {
        return { error: e.message };
    }
};

const getRecentProperties = async () => {
    const limit = 10;
    try {
        const properties = await Property.find().sort({ createdAt: -1 }).limit(limit).populate('owner').exec();
        return properties;
    } catch (e) {
        return { error: e.message };
    }
};

const uploadPropertyImage = async (files, id ) => {
    console.log(files)
    const propertyId = new mongoose.Types.ObjectId(id);

  const uploadPromises =  Object.keys(files).forEach(async (key) => {
        const file = files[key];
        
        return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "RealEstate"
            }
            ,
            async(error, result) => {
                if (error) {
                   return reject(error);
                } 

                try{

                    const property = await Property.findById({_id: propertyId}).exec();
                    
                    if (property == null) {
                        return {error: "Property not found"}
                    };
                    property.imageUrls.push(result.url);
                    await property.save()
                    resolve('File Uploaded Successfully to DB')

                }catch(err){
                    console.log(err)
                    reject(err)
                }
                    
                   
                
            }
        );
     uploadStream.end(file.data);

    })

    })

    return Promise.all(uploadPromises);
    
};

module.exports = {
    getProperties,
    getPropertiesByOwner,
    getProperty,
    deleteProperty,
    getRecentProperties,
    propertyStatus,
    uploadPropertyImage
};