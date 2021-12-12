const Discord = require("discord.js")
const emojiCharacters = require('../emojiCharacters');
module.exports = {
  name: 'poll',
  usage: '[option1] [option2] [option3]',
  desciption: 'Poll command',
  async execute(bot, message, args) {
    let footer = `${bot.user.username} | Uta#3963`;

    message.delete(1000);    
    if (!message.member.roles.cache.some(role => role.name === 'COUNCIL')) {
      let messageSent = await message.channel.send("You need COUNCIL role to run this command.");
      setTimeout(function () {
        messageSent.delete(1000);
        return;
      }, 5000)
    } else {

      let options = args.join(" ");
      console.log(options);
      options = options.split(",");
      console.log(options);

      let description = "";
      let embed = new Discord.MessageEmbed()
        .setTitle("POLL")
        .setColor("GREEN")
        .setFooter(footer)

      for (var i = 0; i < options.length; i++) {
        description += `${emojiCharacters[i + 1]} ${options[i]}\n`;
      }
      embed.setDescription(description)
      let msgEmbed = await message.channel.send({ embeds: [embed] })
      msgEmbed.react(emojiCharacters[1])
        .then(reaction => {
          for (var j = 1; j < options.length; j++) {
            reaction.message.react(emojiCharacters[j + 1]);
          }
        })
        .catch(err => console.error);
    }
  },
};