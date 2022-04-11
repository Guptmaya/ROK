const Discord = require("discord.js")
const prefix = require("../config.json")
const shop = require("../json/shopItems.json")
module.exports = {
  name: 'shop',
  desciption: 'help command',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 5,
  args: false,
  async execute(bot, message, args) {

    let description = "";
    for(let i=0;i<shop.items.length;i++){
      description+=`\*\*\*${(shop.items[i].name).toUpperCase()}\*\*\*\n`+
      `❓ ${shop.items[i].desc}\n`+
      `<:Gem:962910363383365652> ${shop.items[i].cost}\n\n`;
    }

    let embed = new Discord.MessageEmbed()
      .setTitle("Shop")
      .setColor("GREEN")
      .setDescription(description)
      .setFooter("To buy an item, run r!buy [item name]")
    message.channel.send({ embeds: [embed] });

  },
};