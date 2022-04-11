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
      `\`${prefix.prefix1}mge \` : Calculates MGE Points\n` +
      `\`${prefix.prefix1}ap \` : Calculates Total Action Points\n` +
      `\`${prefix.prefix1}tok \` : Calculates Total Tome of Knowledge\n` +
      `\`${prefix.prefix1}rss \` : Calculates Total Resources\n` +
      `\`${prefix.prefix1}gems \` : Calculates Total Gems\n` +
      `\`${prefix.prefix1}goldchest [number of keys]\` : Simulates Gold Chest unlock\n` +
      `\`${prefix.prefix1}wheel \` : Simulates spinning wheel of fortune\n\n` +
      `\*\*\*Game Commands\*\*\*\n` +
      `\`${prefix.prefix1}register \` : To register yourself with bot\n` +
      `\`${prefix.prefix1}profile \` : To check your profile\n` +
      `\`${prefix.prefix1}tutorial \` : To read tutorial\n` +
      `\`${prefix.prefix1}hunt barb\` : To hunt barbarians\n`+
      `\`${prefix.prefix1}shop\` : To check out shop\n`+
      `\`${prefix.prefix1}buy [item name]\` : To buy items\n`+
      `\`${prefix.prefix1}mechanics\` : Game mechanics\n`;



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