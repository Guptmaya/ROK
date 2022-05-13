const Discord = require("discord.js")
const prefix = require("../config.json")
const shop = require("../schemas/shop")
const mongoose = require("mongoose");
const paginator = require("../functions/shopPaginator")
module.exports = {
  name: 'shop',
  desciption: 'help command',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 5,
  args: false,
  async execute(bot, message, args) {

    //arrange the items according to the rarity type

  let ShopItemsDetails = await shop.find();
    console.log(ShopItemsDetails[0]);
    let embedArray = []; //main array of embeds
  
    let totalDocs = await shop.countDocuments(); 
    let numberOfPages = Math.ceil(totalDocs / 10);
    let pageCounter = 1;
    let counter = 0;
    let firstDescription = '';
    
       for (var i = 1; i <= totalDocs; i++) {
        
         firstDescription += `\*\*${ShopItemsDetails[i-1].name}\*\*\u2008\u2008-\u2008\u2008${ShopItemsDetails[i-1].cost}\n`+
         `${ShopItemsDetails[i-1].description}\n`;

         if (i % 10 == 0 && pageCounter < numberOfPages) {
            let embedCut = new Discord.MessageEmbed()
               .setTitle("Shop Items")
               .setColor("RED")
               .setDescription(firstDescription)
               .setFooter(`Page : ${pageCounter}/${numberOfPages}`)
            embedArray[counter] = embedCut;
            firstDescription = '';
            counter++;
            pageCounter++;
         } else if (pageCounter === numberOfPages) {
            let embedCut = new Discord.MessageEmbed()
               .setTitle("Shop Items")
               .setColor("RED")
               .setDescription(firstDescription)
               .setFooter(`Page : ${pageCounter}/${numberOfPages}`)
            embedArray[counter] = embedCut;
         }
      }
   paginator(message, embedArray);
  },
};