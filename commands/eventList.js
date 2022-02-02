const Discord = require("discord.js")
const prefix = require("../config.json")
module.exports = {
  name: 'eventlist',
  desciption: 'help command',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 5,
  args: false,
  async execute(bot, message, args) {

    let desc = "\*\*How to Use the event command ?\*\* \n Run \`r!event [Event Name from below]\`\n\n";
      desc+= `\*\*Current Events in Database:\*\*\n\`\`Arms Training\`\` : r!event Arms Training\n\n`+
      `Will Add more soon.`;
   


      let footer = `${bot.user.username} | Uta#3963`;
      let embed = new Discord.MessageEmbed()
        .setTitle("Event List")
        .setColor("GREEN")
        .setThumbnail(bot.user.displayAvatarURL())
        .setDescription(desc)
        .setFooter(footer)
      message.channel.send({ embeds: [embed] });
    
  },
};