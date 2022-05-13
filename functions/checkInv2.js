const Discord = require("discord.js")
const usersProfile = require("../schemas/userProfile")
const shop = require("../schemas/shop")
async function checkItemExist(message) {


   let userDetails = await usersProfile.findOne({ userID: message.author.id })
      .catch(err => console.log(err))

   let nameList = [];
   let itemList = [];
   let itemCounter = 0;

   for (let i = 0; i < userDetails.items.length; i++) {
      let userHasItem = await shop.findOne({ itemID: userDetails.items[i] })
         .catch(err => console.log(err))
      console.log(userHasItem);
      if (userHasItem) {
         itemList[itemCounter] = userHasItem.itemID;
         nameList[itemCounter] = userHasItem.name;
         itemCounter++;
      }
   }

   return [itemCounter, itemList, nameList]

}
module.exports = { checkItemExist }