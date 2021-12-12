const Discord = require("discord.js")
module.exports = {
  name: 'mge-register',
  desciption: 'Hello command',
  async execute(bot, message, args) {

    message.delete(1000);
    let botChannel = message.guild.channels.cache.find(x => x.id === "917158209305858058");

    if (!message.member.roles.cache.some(role => role.name === 'COUNCIL')) {
      let messageSent = await message.channel.send("You need COUNCIL role to run this command.");
      setTimeout(function () {
        messageSent.delete(1000);
        return;
      }, 5000)
    } else {
      let desciption = "\*\*MGE REGISTRATION:\*\*\n\n" +
        "React ✅ below if you want to be in MGE Top 15. \n\n" +

        "Please send following information to MGE Managers (<@559175255978147840>, <@430381902378172427>, <@419514107717484554>) \n" +
        "1. [MGE REGISTRATION](https://discord.com/channels/710978238200938508/803206957640187944/803211256215371806)\n" +
        "2. Commander you are aiming for in this MGE.\n\n" +
        "Please make sure to read [MGE Rules](https://discord.com/channels/710978238200938508/800702531969744916/800702737910202378)";
      let Embed = new Discord.MessageEmbed()
        .setDescription(desciption)
        .setColor("RED")
      let msgEmbed = await message.channel.send({ embeds: [Embed] })
      msgEmbed.react('✅');
    }
  },
};