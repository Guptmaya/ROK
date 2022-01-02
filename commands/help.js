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



    let botChannel;
    let desc = "";
    if (message.guild.id === "710978238200938508") {
      botChannel = message.guild.channels.cache.find(x => x.id === "919538651195666472");
      desc = `\`${prefix.prefix1}update-name [ROK name]\` : Updates your nickname for server\n\n` +
        `\`${prefix.prefix1}calc \` : To calculate MGE Points\n\n\n` +
        `\`${prefix.prefix1}mge-announce [top 15 user's names]\` : Shows Top 15 MGE governors\n\n` +
        `\`${prefix.prefix1}mge-register \` : Sends message to register for MGE\n\n` +
        `\`${prefix.prefix1}poll <option1> <option2>...<option10> \` : Creates a poll for given options\n\n`;
    } else {
      botChannel = message.guild.channels.cache.find(x => x.id === "926970586503217202");
      desc = `\`${prefix.prefix1}update-name [ROK name]\` : Updates your nickname for server\n\n` +
        `\`${prefix.prefix1}calc \` : To calculate MGE Points\n\n\n`;
    }


    if (message.guild.id == "710978238200938508") {
      if ((message.channel.id !== "919538651195666472" && message.channel.id !== "917158209305858058")) {
        let messageSent = await message.channel.send("Please go to <#919538651195666472> to run this command.");
        setTimeout(function () {
          messageSent.delete(1000);
          return;
        }, 5000)
      }
    } else if (message.guild.id == "926950636937957456") {
      if ((message.channel.id !== "927019188562849842" && message.channel.id !== "926970586503217202")) {
        let messageSent = await message.channel.send("Please go to <#926970586503217202> to run this command.");
        setTimeout(function () {
          messageSent.delete(1000);
          return;
        }, 5000)
      }
    } else {
      let footer = `${bot.user.username} | Uta#3963`;
      let embed = new Discord.MessageEmbed()
        .setTitle("[ HELP ]")
        .setColor("GREEN")
        .setThumbnail(bot.user.displayAvatarURL())
        .setDescription(desc)
        .setFooter(footer)
      message.channel.send({ embeds: [embed] });
    }
  },
};