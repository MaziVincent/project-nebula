const mongoose = require('mongoose');
const Owner = require('../model/Owner');
const bcrypt = require('bcrypt');

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
        if(data.password)  {
            const hashedPassword = await bcrypt.hash(data.password, 10);
                owner.password = hashedPassword;
        }
        if(data.identityImage) owner.identityImage = data.identityImage
        if(data.identityNumber) owner.identityNumber = data.identityNumber
        if(data.identityType) owner.identityType = data.identityType
        if(data.contactAddress) owner.contactAddress = data.contactAddress
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

module.exports = {
    createOwner,
    getOwners,
    getOwner,
    updateOwner,
    deleteOwner,
    ownerExists,
    verifyowner,
    unVerifyOwner
}