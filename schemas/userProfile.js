const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   items: { type: Array, "default": [] },
   wallet: { type: Number, default: 0 },
   bank: { type: Number, default: 0 }
});

module.exports = new mongoose.model('userProfileDetails', userProfileSchema, 'userProfileSchema');