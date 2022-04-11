 const mongoose = require('mongoose');
 const pass = require("../config.json");
 const Levels = require("discord-xp");
 
  module.exports ={
     init: ()=>{
        const dbOptions={
          autoIndex:false,
          connectTimeoutMS:10000,
          family:4
        };
        mongoose.connect(`mongodb+srv://netflixbotuser:${pass.PASS_}@cluster0.5nayk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,dbOptions);
        Levels.setURL(`mongodb+srv://netflixbotuser:${pass.PASS_}@cluster0.5nayk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,dbOptions)
        mongoose.Promise = global.Promise;
 
        mongoose.connection.on('connected',()=>{
           console.log("Bot has connected tp database. YAY!");
        });
        mongoose.connection.on('disconnected',()=>{
          console.log("Bot has disconnected tp database!");
       });
       mongoose.connection.on('err',(err)=>{
          console.log("Error : "+ err);
       });
     }
  }