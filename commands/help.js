const Discord = require("discord.js")
const prefix = require("../config.json")
module.exports = {
  name: 'help',
  desciption: 'help command',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 5,
  args: false,
  async execute(bot, message, args) {

    let desc = "";
    desc = `\*\*\*Calculation Commands\*\*\*\n` +
      `\`${prefix.prefix1}mge \` : Calculates MGE Points\n\n` +
      `\`${prefix.prefix1}ap \` : Calculates Total Action Points\n\n` +
      `\`${prefix.prefix1}tok \` : Calculates Total Tome of Knowledge\n\n` +
      `\`${prefix.prefix1}rss \` : Calculates Total Resources\n\n` +
      `\`${prefix.prefix1}gems \` : Calculates Total Gems\n\n` +
      `\`${prefix.prefix1}goldchest [number of keys]\` : Simulates Gold Chest unlock\n\n` +
      `\`${prefix.prefix1}wheel \` : Simulates spinning wheel of fortune\n\n` +
      `\*\*\*Game Commands\*\*\*\n` +
      `\`${prefix.prefix1}register \` : To register yourself with bot\n\n` +
      `\`${prefix.prefix1}profile \` : To check your profile\n\n` +
      `\`${prefix.prefix1}tutorial \` : To read tutorial\n\n` +
      `\`${prefix.prefix1}hunt barb\` : To hunt barbarians\n\n`;



    let footer = `${bot.user.username} | Uta#3963`;
    let embed = new Discord.MessageEmbed()
      .setTitle("[ HELP ]")
      .setColor("GREEN")
      .setThumbnail(bot.user.displayAvatarURL())
      .setDescription(desc)
      .setFooter(footer)
    message.channel.send({ embeds: [embed] });

  },
};