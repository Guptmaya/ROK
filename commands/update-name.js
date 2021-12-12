const Discord = require("discord.js")
module.exports = {
  name: 'update-name',
  desciption: 'Hello command',
  usage: '[ROK Name]',
  args: true,
  async execute(bot, message, args) {
    if ((message.channel.id !== "919538651195666472" && message.channel.id !== "917158209305858058") && message.channel.id !== "710978238200938511") {
      let messageSent = await message.channel.send("Please go to <#919538651195666472> to run this command.");
      setTimeout(function () {
        messageSent.delete(1000);
        return;
      }, 5000)
    } else {
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