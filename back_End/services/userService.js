const User = require('../model/User');
const bcrypt = require('bcrypt');
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllUsers = async (data) => {
    let page = parseInt(data.page) || 1;
    let limit = parseInt(data.limit) || 5;
    let skip = (page - 1) * limit;
  try {
    const users = await User.find().skip(skip).limit(limit);
    const totalCount = await User.countDocuments();
    return {users, page, totalPage: Math.ceil(totalCount / limit)}
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (id) => {
  try{
    const user = await User.findOne({_id : id}).exec();
    if(!user) return {error: "User not found"};
    return user;
  } catch (e) {
    return {error: e.message}
  }
};

const updateUser = async (id, data) => {
    try{
        const user = await User.findOne({_id : id}).exec();
        if(!user) return {error: "User not found"};
        if(data.firstname) user.firstname = data.firstname
        if(data.lastname) user.lastname = data.lastname
        if(data.email) user.email = data.email
        if(data.phone) user.phone = data.phone
        if(data.password)  {
            const hashedPassword = await bcrypt.hash(data.password, 10);
                user.password = hashedPassword;
        }
        await user.save();
        return user;
    } catch (e) {
        return {error: e.message}
    }
}
const deleteUser = async (id) => {
    try{
        const user = await User.findOne({_id : id}).exec();
        if(!user) return {error: "User not found"};
        await user.deleteOne();
        return user;
    } catch (e) {
        return {error: e.message}
    }
};
const activateUser = async (status, id) => {
  console.log(id, status);
  try {
      const userId = new mongoose.Types.ObjectId(id);
      const user = await User.findById(userId);
      if (!user) return { error: "User not found" };
      user.status = status;
      await user.save();
      
      return user;
  } catch (e) {
      return { error: e.message };
  }
};


const uploadProfilePicture = async (files, id) => {
  console.log(files);
  const userId = new mongoose.Types.ObjectId(id);

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
            const user = await User.findById(userId).exec();

            if (user == null) {
              return { error: "User not found" };
            }
            user.profile = result.secure_url;
            await user.save();
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


const userExists = async (email) => {

  try {
      const user = await User.findOne({email: email}).exec();
      if(!user) return false;
      return user;

  } catch (e) {
    
      return {error: e.message}
  }
};



module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    activateUser,
    uploadProfilePicture,
    userExists
}