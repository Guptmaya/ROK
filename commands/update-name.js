const Discord = require("discord.js")
module.exports = {
  name: 'update-name',
  desciption: 'Updates nickname',
  usage: '[ROK Name]',
  args: true,
  async execute(bot, message, args) {
    if (message.author.id != "541467870819778562") return;
    let rokName = args.join(" ");
    let discordName = message.author.username;
    let newName = `${discordName} | ${rokName}`;

    message.member.setNickname(newName).then(value => {
      console.log(value);
      let Embed = new Discord.MessageEmbed()
        .setTitle("Name Updated")
        .setDescription("Your New Nickname - " + `\*\*${newName}\*\*`)
        .setColor("GREEN")
        .setFooter(`${bot.user.username} | Uta#3963`)
      message.channel.send({ embeds: [Embed] });
    })

  },
};