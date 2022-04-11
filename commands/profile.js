const Discord = require("discord.js")
const mongoose = require("mongoose");
const Levels = require('discord-xp');
const UserProfile = require("../schemas/userProfile")
module.exports = {
  name: 'profile',
  desciption: 'User Profile with Bot',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 10,
  args: false,
  async execute(bot, message, args) {

    const target = await Levels.fetch(message.author.id, message.guild.id);

    //check whether user exists in database or not
    let UserProfileDetails = await UserProfile.findOne({ userID: message.author.id })
      .then(value => {
        let battles = value.defeat + value.victory;
        let embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setTitle("Profile")
          .setDescription(`\`\`\` Name :   ${message.author.username} (${value.civilization}) \n` +
            `\n Civilization :  ${value.civilization} ` +
            `\n Battles :  ${value.victory}/${battles} ` +
            `\n Level :  ${target.level} ` +
            `\n Barbarians :  ${value.barbs} \`\`\``)
          .setThumbnail(message.author.displayAvatarURL())
        return message.channel.send({ embeds: [embed] });

      })
      .catch(err => {
        console.log(err);
      })


  },
};