const Discord = require("discord.js")
const emojiCharacters = require('../emojiCharacters');
const apCalculation = require("../functions/actionPoints")
const millifyPackage = require("millify")
const checkInteger = require("../functions/checkNumber")
module.exports = {
  name: 'mechanics',
  desciption: 'Tutorial',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 5,
  args: false,
  async execute(bot, message, args) {


    let embed = new Discord.MessageEmbed()
      .setTitle("Game Mechanics")
      .setColor("GREEN")
      .setDescription(`Game has two basic stats: Attack and Health. Each commander has a permanent attack and health number.` +
        `Each Level in server boosts attack by 5% and health by 2%. Difference of Attack-Health from player to barb and vice versa results in player winning or loosing the hunt.` +
        `\nPlayer gets the gems from each successful hunt. Gems can be used in shop to expereince. Higher experience means higher level giving higher boost to attack and health stat.`)
      .setFooter("More features will be coming soon.")
    message.channel.send({ embeds: [embed] });

  },
};