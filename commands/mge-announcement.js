const Discord = require("discord.js")
module.exports = {
  name: 'mge-announce',
  desciption: 'Hello command',
  usage: '[Names]',
  args: true,
  async execute(bot, message, args) {

    let botChannel = message.guild.channels.cache.find(x => x.id === "917158209305858058");
    if (!message.member.roles.cache.some(role => role.name === 'COUNCIL')) {
      let messageSent = await message.channel.send("You need COUNCIL role to run this command.");
      setTimeout(function () {
        messageSent.delete(1000);
        return;
      }, 5000)
    } else {

      let announcementChannel = message.guild.channels.cache.find(x => x.id === "714932366384168981");
      let mgeNames = args.join(" ");
      mgeNames = mgeNames.split(" ");
      let desciption = `\*\*Top ${mgeNames.length} MGE\*\*\n\n`;

      for (var i = 0; i <= mgeNames.length; i++) {
        if (i === mgeNames.length) {
          desciption += `\nMake sure to read [MGE Rules](https://discord.com/channels/710978238200938508/800702531969744916/800702737910202378).`
        } else {
          desciption += `${i + 1}. ${mgeNames[i]}\n`;
        }


      }
      let Embed = new Discord.MessageEmbed()

        .setDescription(desciption)
        .setColor("RED")
      announcementChannel.send({ embeds: [Embed] });
    }


  },
};