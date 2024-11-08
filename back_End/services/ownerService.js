
const Owner = require('../model/Owner');
const bcrypt = require('bcrypt');
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createOwner = async (data) => {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newOwner = await Owner.create({
            "firstname": data.firstname,
            "lastname": data.lastname,
            "email": data.email,
            "phone": data.phone,
            "password": hashedPassword,
            "identityImage": data.identityImage,
            "identityNumber": data.identityNumber,
            "identityType": data.identityType,
            "contactAddress": data.contactAddress,
            "whatsappLink": data.whatsappLink,
            "searchString": `${data.firstname} ${data.lastname} ${data.email} ${data.phone}`
        })
        return newOwner;
    } catch (e) {
        return {error: e.message}
    }
};

const getOwners = async (data) => {
    let page = parseInt(data.page) || 1;
    let limit = parseInt(data.limit) || 5;
    let skip = (page - 1) * limit;
    try {
        const owners = await Owner.find().skip(skip).limit(limit);
        const totalCount = await Owner.countDocuments();
        return {owners, page, totalCount}
    } catch (e) {
        return {error: e.message}
    }
};

const getOwner = async (id) => {
    try {
        const owner = await Owner.findOne({_id : id}).exec();
        if(!owner) return {error: "Owner not found"};
        return owner;
    } catch (e) {
        return {error: e.message}
    }
};

const updateOwner = async (id, data) => {
    try {
        const owner = await Owner.findOne({_id : id}).exec();
        if(!owner) return {error: "Owner not found"};
        if(data.firstname) owner.firstname = data.firstname
        if(data.lastname) owner.lastname = data.lastname
        if(data.email) owner.email = data.email
        if(data.phone) owner.phonr = data.phone
        if(data.identityImage) owner.identityImage = data.identityImage
        if(data.identityNumber) owner.identityNumber = data.identityNumber
        if(data.identityType) owner.identityType = data.identityType
        if(data.contactAddress) owner.contactAddress = data.contactAddress
        if(data.whatsappLink) owner.whatsappLink = data.whatsappLink
        
        const result = await owner.save();
        return result;
    } catch (e) {
        return {error: e.message}
    }
};

const deleteOwner = async (id) => {
    try {
        const owner = await Owner.findOne({_id : id}).exec();
        if(!owner) return {error: "Owner not found"};
        const result = await owner.deleteOne()
        return result;
    } catch (e) {
        return {error: e.message}
    }
};

const ownerExists = async (email) => {
    try {
        const owner = await Owner.findOne({email: email}).exec();
        return owner;
    } catch (e) {
        return {error: e.message}
    }
};

const verifyowner = async (id) => {
    try {
        const owner = await Owner.findOne({_id : id}).exec();
        if(!owner) return {error: "Owner not found"};
        owner.verified = true;
        const result = await owner.save();
        return result;
    } catch (e) {
        return {error: e.message}
    }
}

const unVerifyOwner = async (id) => {
    try {
        const owner = await Owner.findOne({_id : id}).exec();
        if(!owner) return {error: "Owner not found"};
        owner.verified = false;
        const result = await owner.save();
        return result;
    } catch (e) {
        return {error: e.message}
    }
}

const uploadDocument = async (files, id) => {
    console.log(files);
    const ownerId = new mongoose.Types.ObjectId(id);
  
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
              const owner = await Owner.findById(ownerId).exec();
  
              if (owner == null) {
                return { error: "Owner not found" };
              }
              owner.identityImage = result.secure_url;
              await owner.save();
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
    createOwner,
    getOwners,
    getOwner,
    updateOwner,
    deleteOwner,
    ownerExists,
    verifyowner,
    unVerifyOwner,
    uploadDocument
}