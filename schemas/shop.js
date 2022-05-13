const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   itemID: { type: Number, default: 0 },
   name: String,
   description: String,
   series: String,
   stock: String,
   cost: { type: Number, default: 0 },
   rarity: String,
   effects: String,
   itemImage: String
});

module.exports = new mongoose.model('shopDetails', shopSchema, 'shopSchema');