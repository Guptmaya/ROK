const Discord = require("discord.js")
const existOrNot = require("../functions/itemExistOrNot")
const shop = require("../schemas/shop")
module.exports = {
  name: 'item-info',
  desciption: 'help command',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 5,
  args: false,
  async execute(bot, message, args) {


    let successEmbed = new Discord.MessageEmbed
    successEmbed.setDescription(`loading...`)
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
    console.log(itemFoundOrNot);

    //if item found, show details
    if (itemFoundOrNot === "Yes") {
      itemId = itemDetailArray[1];
      itemName = itemDetailArray[2];
      itemDesc = itemDetailArray[3];
      itemCost = itemDetailArray[4];
      itemRarity = itemDetailArray[5];
      itemStock = itemDetailArray[6];
      itemImage = itemDetailArray[7];
      itemEffects = itemDetailArray[8];
      itemSeries = itemDetailArray[9];

      successEmbed.setTitle(itemName)
      successEmbed.setColor("NOT_QUITE_BLACK")
      //successEmbed.setThumbnail(itemImage)
      successEmbed.setDescription(`> ${itemDesc}\n\n` +
        `\*\*Cost - \*\*${itemCost}\n\n`)
      successEmbed.setFooter(`To buy this item run \`buy\` command`)

      successEmbed.addFields(
        { name: 'Rarity', value: `\`${itemRarity}\``, inline: true },
        { name: 'Stock', value: `\`${itemStock}\``, inline: true },
        { name: 'ID', value: `\`${itemId}\``, inline: true },
        { name: 'Effects', value: `\`${itemEffects}\``, inline: false },
        { name: 'Part Of', value: `\`${itemSeries}\``, inline: false }
      )
    } else {
      successEmbed.setColor("WHITE")
      successEmbed.setDescription(`Item not found.\nRun \`shop\` to check all the items.`)
    }
    message.channel.send({ embeds: [successEmbed] })
  },
};