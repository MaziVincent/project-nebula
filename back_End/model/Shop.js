const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Property = require('./Property');

const ShopSchema = Property.discriminator('Shop', new Schema({
    shopCategory: {
        type: String,
        required: true
    },
    leaseDuration: {
        type: String,
    },
    securityDeposit: {
        type: String,
    }
}));

module.exports = ShopSchema;