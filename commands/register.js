const Discord = require("discord.js")
const mongoose = require("mongoose");
const UserProfile = require("../schemas/userProfile")
module.exports = {
  name: 'register',
  desciption: 'Register User with Bot',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 10,
  args: false,
  async execute(bot, message, args) {

    //check whether user exists in database or not
    let UserProfileDetails = await UserProfile.findOne({ userID: message.author.id });
    if (!UserProfileDetails) {
      
      //create schema
      UserProfileDetails = await new UserProfile({
        _id: mongoose.Types.ObjectId(),
        userID: message.author.id,
        alliance: "--",
        victory: 0,
        defeat: 0,
        barbs: 0,
        civilization: "--",
        primaryCommander: "PeaceKeeper",
        secondaryCommander: "--",
        totalCommanders: 1,
        allCommanders: { type: Array, "default": [] },
        gems: 100
      });
      await UserProfileDetails.save().catch(err => console.log(err)).then(value => {
        //save data in database and send success message
        let embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`You have been registered with bot.\n\n` +
            `Run \`r!tutorial\` to check the tutorial.`)
        return message.channel.send({ embeds: [embed] });
      })
    }
    else {
      //send failed message as user already exists in database

      let embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`You are already register with bot.`)
        .setFooter("Run r!profile to check your profile.")
      return message.channel.send({ embeds: [embed] });
    }
  },
};