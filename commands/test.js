const Discord = require("discord.js")
const prefix = require("../config.json")
module.exports = {
  name: 'test',
  desciption: 'help command',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 5,
  args: false,
  async execute(bot, message, args) {
   message.channel.send(message.guild.iconURL())
  },
};