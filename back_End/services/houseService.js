const mongoose = require('mongoose');
const House = require('../model/House');
const User = require('../model/User');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createHouse = async (data) => {
    const ownerId = new mongoose.Types.ObjectId(data.owner);

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
            buildingType: data.buildingType,
            docType: data.docType,
            propertyType: data.propertyType,
            paymentType:data.paymentType,
            livingRoomFeatures: data.livingRoomFeatures,
            exteriorFeatures: data.exteriorFeatures,
            interiorFeatures: data.interiorFeatures,
            kitchenFeatures: data.kitchenFeatures,
            searchString: `${data.title} ${data.price} ${data.location} ${data.propertyType} ${data.buildingType} ${data.lotSize}`
        
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
        if(data.docType) house.docType = data.docType
        if(data.buildingType) house.buildingType = data.buildingType
        if(data.propertyType) house.propertyType = data.propertyType
        if(data.paymentType) house.paymentType = data.paymentType
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

const uploadDocImage = async (files, id) => {
    console.log(files);
    const houseId = new mongoose.Types.ObjectId(id);
  
    const uploadPromises = Object.keys(files).map(async (key) => {
      const file = files[key];
  
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "RealEstate",
          },
          async (error, result) => {
            if (error) {
              return reject(error);
            }
  
            try {
              const house = await House.findById({
                _id: houseId,
              }).exec();
  
              if (house == null) {
                return { error: "House not found" };
              }
              house.docImages.push(result.secure_url);
              await house.save();
              resolve("File Uploaded Successfully to DB");
            } catch (err) {
              console.log(err);
  
              reject(err);
            }
          }
        );
        uploadStream.end(file.data);
      });
    });
  
    return Promise.all(uploadPromises);
  };

module.exports = {
    createHouse, 
    getHouses, 
    getHouse, 
    updateHouse, 
    deleteHouse, 
    houseExists,
    houseStatus,
    uploadDocImage
}