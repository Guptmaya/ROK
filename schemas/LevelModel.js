const mongoose = require('mongoose');

const Levels = new mongoose.Schema({
   _id:mongoose.Schema.Types.ObjectId,
   xp:{type:Number, defaultl:0},
   level:{type:Number,defualt:0},
   lastUpdated:{ type: Date},
   userID:String,
   guildID:String,
});

module.exports = new mongoose.model('LevelDetail',Levels,'levels');