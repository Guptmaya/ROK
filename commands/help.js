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
    if (message.channel.id !== "919538651195666472" && message.channel.id !== "917158209305858058") {
      let messageSent = message.channel.send("Please go to <#919538651195666472> to run this command.");
      setTimeout(function () {
        messageSent.delete(1000);
        return;
      }, 5000)
    }
    else {
      let footer = `${bot.user.username} | Uta#3963`;
      let embed = new Discord.MessageEmbed()
        .setTitle("[ HELP ]")
        .setColor("GREEN")
        .setThumbnail(bot.user.displayAvatarURL())
        .setDescription(`\`${prefix.prefix1}update-name [ROK name]\` : Updates your nickname for server\n\n` +
          `\`${prefix.prefix1}calc \` : To calculate MGE Points\n\n\n` +
          `\`${prefix.prefix1}mge-announce [top 15 user's names]\` : Shows Top 15 MGE governors\n\n` +
          `\`${prefix.prefix1}mge-register \` : Sends message to register for MGE\n\n` +
          `\`${prefix.prefix1}poll <option1> <option2>...<option10> \` : Creates a poll for given options\n\n`)
        .setFooter(footer)
      message.channel.send({ embeds: [embed] });
    }
  },
};