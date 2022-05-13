const Discord = require("discord.js")
const mongoose = require("mongoose");
const Levels = require('discord-xp');
const millifyPackage = require("millify")
const UserProfile = require("../schemas/userProfile")
module.exports = {
  name: 'profile',
  desciption: 'User Profile with Bot',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 10,
  args: false,
  async execute(bot, message, args) {

    let mentionedMember = message.mentions.members.first();
    if (!mentionedMember) mentionedMember = message.member;
    console.log(mentionedMember);
    const target = await Levels.fetch(mentionedMember.id, "10000");
    let inventory;
    let walletCoins;
    let bankCoins;
    let UserProfileDetails = await UserProfile.findOne({ userID: mentionedMember.id }).catch(err => {
      console.log(err);
    })
    if (!UserProfileDetails) {
      inventory = `0 items`;
      walletCoins = 0;
      bankCoins = 0;
    }
    else {
      let totalNumberOfItems = 50;
      inventory = `${UserProfileDetails.items.length} items`;
      walletCoins = UserProfileDetails.wallet;
      bankCoins = UserProfileDetails.bank;
    }

    let title = `${(mentionedMember.user.username).toUpperCase()}'s Profile`;
    let userLevel = target.level;
    let xpRequired = await Levels.xpFor(target.level + 1);
    let xpHave = await target.xp;
    let avatar = mentionedMember.user.displayAvatarURL({ format: 'png' })

    //let favoriteSeries = "Dark"; 


    let embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(title)
      .setDescription(`\*\*\*Leveling\*\*\*\n` +
        `\`\`\` Level :   ${userLevel}` +
        `\n Experience :  ${xpHave}/${xpRequired} \`\`\`\n` +
        `\*\*\*Shop\*\*\*\n` +
        `\`\`\` Wallet :   ${walletCoins}\n` +
        ` Bank :   ${bankCoins}\n` +
        ` Inventory :  ${inventory} \`\`\`\n`
      )
      .setThumbnail(message.author.displayAvatarURL())
    return message.channel.send({ embeds: [embed] });
  },
};