const mongoose = require('mongoose');
const constants = require('../utils/constants');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: [constants.restaurantCategory.dineout, constants.restaurantCategory.takeout],
        default: constants.restaurantCategory.dineout,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: function () {
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: function () {
            return Date.now();
        }
    }

})

module.exports = mongoose.model('restaurant', restaurantSchema);