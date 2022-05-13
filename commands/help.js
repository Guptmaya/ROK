const Discord = require("discord.js")
const usersProfile = require("../schemas/userProfile")
const shop = require("../schemas/shop")
const existOrNot = require("../functions/itemExistOrNot")
module.exports = {
  name: 'ping',
  desciption: 'help command',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 5,
  args: false,
  async execute(bot, message, args) {

    for(let i=0;i<5;i++){
      message.channel.send("hello"+`<@${message.author.id}>`);
    }
    
  },
};