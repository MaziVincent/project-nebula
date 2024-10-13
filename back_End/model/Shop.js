const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Property = require('./Property');

const ShopSchema = Property.discriminator('Shop', new Schema({
    shopType: {
        type: String,
        required: true
    },
    shopCategory: {
        type: String,
        required: true
    },
    leaseDuration: {
        type: Number,
        required: true
    },
    securityDeposit: {
        type: Number,
        required: true
    }
}));

module.exports = ShopSchema;