const Discord = require("discord.js")
const emojiCharacters = require('../emojiCharacters');
const apCalculation = require("../functions/actionPoints")
const millifyPackage = require("millify")
const checkInteger = require("../functions/checkNumber")
module.exports = {
  name: 'tutorial',
  desciption: 'Tutorial',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 5,
  args: false,
  async execute(bot, message, args) {


    let embed = new Discord.MessageEmbed()
      .setTitle("Tutorial")
      .setColor("GREEN")
      .setDescription("For now player can only kill barbarians.\n "+
      "Every player will get same starting commander which will be peacekeeper."+
      "\n Use the peacekeeper to hunt barbarians.\n"+
      "Killing Barbarians will give you some gems.\n\n"+
      `To hunt barbarians run \`r!hunt barb\``)
    message.channel.send({ embeds: [embed] });

  },
};