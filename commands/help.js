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
      desc = `\`${prefix.prefix1}mge \` : Calculates MGE Points\n\n` +
        `\`${prefix.prefix1}ap \` : Calculates Total Action Points\n\n` +
        `\`${prefix.prefix1}tok \` : Calculates Total Tome of Knowledge\n\n` +
        `\`${prefix.prefix1}rss \` : Calculates Total Resources\n\n` +
        `\`${prefix.prefix1}gems \` : Calculates Total Gems\n\n` +
        `\`${prefix.prefix1}goldchest [number of keys]\` : Simulates Gold Chest unlock\n\n` +
        `\`${prefix.prefix1}wheel \` : Simulates spinning wheel of fortune\n\n` +
        `\`${prefix.prefix1}event [Event's Name]\` : Gives information about certain event\n\n` +
        `\`${prefix.prefix1}eventlist \` : Shows the events list for r!event command\n\n`;
   


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