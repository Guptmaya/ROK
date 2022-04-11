const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   userID: String,
   alliance: String,
   victory: { type: Number, default: 0 },
   defeat: { type: Number, default: 0 },
   barbs: { type: Number, default: 0 },
   civilization: String,
   primaryCommander: String,
   secondaryCommander: String,
   totalCommanders: { type: Number, default: 1 },
   allCommanders: { type: Array, "default": [] },
   gems: { type: Number, default: 100 }
});

module.exports = new mongoose.model('userProfileDetails', userProfileSchema, 'userProfileSchema');