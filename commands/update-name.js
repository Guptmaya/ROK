const Discord = require("discord.js")
module.exports = {
  name: 'update-name',
  desciption: 'Hello command',
  usage: '[ROK Name]',
  args: true,
  async execute(bot, message, args) {
    if (message) return message.channel.send("This command is under review for having a bug.\n We are trying to fix the bug asap.");

    let counter = true;
    if (message.guild.id == "710978238200938508") {
      if ((message.channel.id !== "919538651195666472" && message.channel.id !== "917158209305858058") && message.channel.id !== "710978238200938511") {
        let messageSent = await message.channel.send("Please go to <#919538651195666472> to run this command.");
        setTimeout(function () {
          messageSent.delete(1000);
          return;
        }, 5000)
        counter = false;
      }
    } else if (message.guild.id == "926950636937957456") {
      if ((message.channel.id !== "927019188562849842" && message.channel.id !== "926970586503217202") && message.channel.id !== "927017382407462924") {
        let messageSent = await message.channel.send("Please go to <#926970586503217202> to run this command.");
        setTimeout(function () {
          messageSent.delete(1000);
          return;
        }, 5000)
        counter = false;
      }
    }
    if (counter) {
      let rokName = args.join(" ");
      let discordName = message.author.username;
      let newName = `${discordName} | ${rokName}`;

      message.member.setNickname(newName).then(value => {
        console.log(value);
        let Embed = new Discord.MessageEmbed()
          .setTitle("Name Updated")
          .setDescription("Your New Nickname - " + `\*\*${newName}\*\*`)
          .setColor("GREEN")
        message.channel.send({ embeds: [Embed] });
      })
    }
  },
};