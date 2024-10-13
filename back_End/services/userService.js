const User = require('../model/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

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

const activateUser = async (id, status) => {
    try{
        const user = await User.findOne({_id : id}).exec();
        if(!user) return {error: "User not found"};
        user.status = status;
        await user.save();
        return user;
    } catch (e) {
        return {error: e.message}
    }
}

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    activateUser
}