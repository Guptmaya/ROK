const Discord = require("discord.js")
const prefix = require("../config.json")
const shop = require("../json/shopItems.json")
const Levels = require('discord-xp');
const UserProfile = require("../schemas/userProfile")
module.exports = {
  name: 'buy',
  desciption: 'help command',
  guildOnly: true,
  usage: '[item name]',
  cooldown: 5,
  args: true,
  async execute(bot, message, args) {

    let embed = new Discord.MessageEmbed()
      .setTitle("Buy")
      .setColor("GREEN")

    let itemToBuy = args.join(" ");
    itemToBuy = itemToBuy.toLowerCase();
    console.log(itemToBuy);
    let itemIndex = -1;
    let description = '';
    for (let i = 0; i < shop.items.length; i++) {
      if ((shop.items[i].name).toLowerCase() === itemToBuy) {
        itemIndex = i;
      }
    }

    if (itemIndex === -1) {
      return message.channel.send("Item not found. Please make sure the item name is correct.");
    }
    //get user's gems
    let UserProfileDetails = await UserProfile.findOne({ userID: message.author.id });
    let userGems = UserProfileDetails.gems;

    //check if user has gems subtract if not fail embed
    if (userGems > shop.items[itemIndex].cost) {
      if (itemToBuy === "1000 experience") {
        await UserProfile.findOneAndUpdate({ userID: message.author.id }, { gems: UserProfileDetails.gems - shop.items[itemIndex].cost })
          .then(value => {
            Levels.appendXp(message.author.id, message.guild.id, 1000)
              .catch(errr => {
                console.log(errr);
              })
          }).catch(err => {
            console.log(err);
          })
        const target = await Levels.fetch(message.author.id, message.guild.id);
        var xpRequired = await Levels.xpFor(target.level + 1);
        var xpHave = await target.xp;
        description = "1000 experience points have been added to your account.\n" +
          `\*\*\*Experience : \*\*\*${xpHave}/${xpRequired}\n`+
          `\*\*\*Gems :  \*\*\*<:Gem:962910363383365652> ${UserProfileDetails.gems}`;

      }
    } else {
      embed.color("RED")
      description = "You do not have enough <:Gem:962910363383365652> gems."
    }

    embed.setDescription(description)
    message.channel.send({ embeds: [embed] });

  },
};