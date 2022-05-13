const Discord = require("discord.js")
const usersProfile = require("../schemas/userProfile")
const shop = require("../schemas/shop")
const existOrNot = require("../functions/itemExistOrNot")
module.exports = {
  name: 'by',
  desciption: 'help command',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 5,
  args: false,
  async execute(bot, message, args) {

    //check if user profile exist or not
    let userDetails = await usersProfile.findOne({ userID: message.author.id })
    if (!userDetails) {
      userDetails = await new usersProfile({
        _id: mongoose.Types.ObjectId(),
        wallet: 0,
        bank: 0
      });
      await userDetails.save()
        .catch(err => console.log(err))
    }

    let successEmbed = new Discord.MessageEmbed
    let itemId = '';
    let itemName = '';
    let itemDesc = '';
    let itemCost = '';
    let itemRarity = '';
    let itemImage = '';
    let itemStock = '';
    let itemSeries = '';
    let itemFoundOrNot = 'No';

    let nameOrId = args.join(" ");
    console.log(nameOrId);

    //function to check is item exists or not
    let itemDetailArray = await existOrNot.checkItemExist(nameOrId);
    itemFoundOrNot = itemDetailArray[0];
    itemId = itemDetailArray[1];
    itemName = itemDetailArray[2];
    itemDesc = itemDetailArray[3];
    itemCost = itemDetailArray[4];
    itemRarity = itemDetailArray[5];
    itemStock = itemDetailArray[6];
    itemImage = itemDetailArray[7];
    itemEffects = itemDetailArray[8];
    itemSeries = itemDetailArray[9];

    //if item is out of stock
    console.log(itemStock);
    if (itemStock <= 0 && itemStock != 'infinite') {
      return message.channel.send("This item is out of stock.");
    }


    //if item is found or not
    if (itemFoundOrNot === "Yes") {

      //check if user owns this item exist
      for (let i = 0; i < userDetails.items.length; i++) {
        if (userDetails.items[i] === itemId) {
          return message.channel.send("You already own this item.\n" +
            "Run \`inevntory\` tp check your inventory.");
        }
      }
      await userDetails.updateOne({ $push: { items: itemId } })
        .catch(err => console.log(err))

      //if not found create user and let him buy item.
      let tempTitle = `You have bought ${itemName} for ${itemCost}.`;
      successEmbed.setTitle(tempTitle)
      successEmbed.setColor("RED")
      //successEmbed.setThumbnail(itemImage)
      successEmbed.setFooter("Run shop command to check other items.")
    } else {
      let tempTitle = `Item not found.\nRun \`shop\` to check all the items.`;
      successEmbed.setColor("WHITE")
      successEmbed.setTitle(tempTitle)
    }
    message.channel.send({ embeds: [successEmbed] })
  },
};