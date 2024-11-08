const Admin = require('../model/Admin');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const createAdmin = async (data) => {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newAdmin = await Admin.create({
            "firstname": data.firstname,
            "lastname": data.lastname,
            "username": data.username,
            "email": data.email,
            "phone": data.phone,
            "password": hashedPassword,
            "searchString": `${data.firstname} ${data.lastname} ${data.username} ${data.email} ${data.phone}`
        })
        return newAdmin;
    } catch (e) {
        return {error: e.message}
    }
};

const getAdmins = async (data) => {
    let page = parseInt(data.page) || 1;
    let limit = parseInt(data.limit) || 5;
    let skip = (page - 1) * limit;
    try {
        const admins = await Admin.find().skip(skip).limit(limit);
        const totalCount = await Admin.countDocuments();
        return {admins, page, totalCount}
    } catch (e) {
        return {error: e.message}
    }
};

const getAdmin = async (id) => {
    try {
        const admin = await Admin.findOne({_id : id}).exec();
        if(!admin) return {error: "Admin not found"};
        return admin;
    } catch (e) {
        return {error: e.message}
    }
};

const updateAdmin = async (id, data) => {
    try {
        const admin = await Admin.findOne({_id : id}).exec();
        if(!admin) return {error: "Admin not found"};
        
        if(data.firstname) admin.firstname = data.firstname
        if(data.lastname) admin.lastname = data.lastname
        if(data.username) admin.username = data.username
        if(data.email) admin.email = data.email
        if(data.phone) admin.phone = data.phone

        const result = await admin.save();
        return result
    } catch (e) {
        return {error: e.message}
    }
};

const deleteAdmin = async (id) => {
    try {
        const admin = await Admin.findOne({_id : id}).exec();
        if(!admin) return {error: "Admin not found"};
        const result = await Admin.deleteOne({_id : id});
        return result;
    } catch (e) {
        return {error: e.message}
    }
};

const adminExists = async (email) => {
    try {
        const admin = await Admin.findOne({email}).exec();
        return admin;

    } catch (e) {
        return {error: e.message}
    }
};

module.exports = {
    createAdmin,
    getAdmins,
    getAdmin,
    updateAdmin,
    deleteAdmin,
    adminExists
}