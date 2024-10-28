const Customer = require('../model/Customer');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const createCustomer = async (data) => {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newCustomer = await Customer.create({
            "firstname": data.firstname,
            "lastname": data.lastname,
            "email": data.email,
            "phone": data.phone,
            "password": hashedPassword,
            "searchString": `${data.firstname} ${data.lastname} ${data.username} ${data.email} ${data.phone}`
        })
        return newCustomer;
    } catch (e) {
        return {error: e.message}
    }
};

const getCustomers = async (data) => {
    let page = parseInt(data.page) || 1;
    let limit = parseInt(data.limit) || 5;
    let skip = (page - 1) * limit;
    try {
        const customers = await Customer.find().skip(skip).limit(limit);
        const totalCount = await Customer.countDocuments();
        return {customers, page, totalCount}
    } catch (e) {
        return {error: e.message}
    }
};

const getCustomer = async (id) => {
    try {
        const customer = await Customer.findOne({_id : id}).exec();
        if(!customer) return {error: "Customer not found"};
        return customer;
    } catch (e) {
        return {error: e.message}
    }
};


const updateCustomer = async (id, data) => {
    try {
        const customer = await Customer.findOne({_id : id}).exec();
        if(!customer) return {error: "Customer not found"};
        if(data.firstname) customer.firstname = data.firstname
        if(data.lastname) customer.lastname = data.lastname
        if(data.email) customer.email = data.email
        if(data.phone) customer.phonr = data.phone
        if(data.password)  {
            const hashedPassword = await bcrypt.hash(data.password, 10);
                customer.password = hashedPassword;
        }
        const result = await customer.save();
        return result;
    } catch (e) {
        return {error: e.message}
    }
};

const deleteCustomer = async (id) => {
    try {
        const customer = await Customer.findOne({_id : id}).exec();
        if(!customer) return {error: "Customer not found"};
        const result = await customer.deleteOne()
        return result;
    } catch (e) {
        return {error: e.message}
    }
};

const customerExists = async (email) => {
    try {
        const customer = await Customer.findOne({email: email}).exec();
        return customer;
    } catch (e) {
        return {error: e.message}
    }
};


module.exports = {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer,
    customerExists
}