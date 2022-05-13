const Discord = require("discord.js")
const usersProfile = require("../schemas/userProfile")
const shop = require("../schemas/shop")
async function checkItemExist(mainArgument, message) {

   let whichSeries = mainArgument;
   let userDetails = await usersProfile.findOne({ userID: message.author.id })
   let itemCounter = 0;
   let userInventoryIds = [];
   let userInventoryNames = [];

   let seriesItemsLists = await shop.find({ series: { $regex: `^${whichSeries}$`, $options: 'i' } })
      .catch(err => console.log(err))

   for (let i = 0; i < seriesItemsLists.length; i++) {
      for (let j = 0; j < userDetails.items.length; j++) {
         if (seriesItemsLists[i].itemID === userDetails.items[j]) {
            userInventoryIds[itemCounter] = userDetails.items[j];
            userInventoryNames[itemCounter] = seriesItemsLists[i].name;
            itemCounter++;
         }
      }
   }

   console.log("user\n" + userInventoryIds);
   return [itemCounter, userInventoryIds, userInventoryNames];
}
module.exports = { checkItemExist }