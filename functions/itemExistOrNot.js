const Discord = require("discord.js")
const shop = require("../schemas/shop")
async function checkItemExist(mainArgument) {

   //item detail array
   let everything = [];
   everything[0] = 'No'; //itemFoundOrNot;
   for (let i = 1; i <= 9; i++) {
      everything[i] = '';
   }

   let nameOrId = mainArgument;
   console.log(nameOrId);

   //name chosen
   if (isNaN(nameOrId)) {
      nameOrId = nameOrId.toLowerCase();
      let ShopItemsDetails = await shop.findOne({ name: { $regex: `^${nameOrId}$`, $options: 'i' } })
         .catch(err => {
            console.log(err);
         })
      //add details to variables
      if (ShopItemsDetails) {
         everything[0] = 'Yes';
         everything[1] = ShopItemsDetails.itemID;
         everything[2] = ShopItemsDetails.name;
         everything[3] = ShopItemsDetails.description;
         everything[4] = ShopItemsDetails.cost;
         everything[5] = ShopItemsDetails.rarity;
         everything[6] = ShopItemsDetails.stock;
         everything[7] = ShopItemsDetails.itemImage;
         everything[8] = ShopItemsDetails.effects;
         everything[9] = ShopItemsDetails.series;
      }
   } else {
      //id chosen
      nameOrId = parseInt(nameOrId, 10);
      console.log("inside else + " + nameOrId);
      let ShopItemsDetails = await shop.findOne({ itemID: nameOrId })
         .catch(err => {
            console.log(err);
         })
      //add details to variables
      if (ShopItemsDetails) {
         everything[0] = 'Yes';
         everything[1] = ShopItemsDetails.itemID;
         everything[2] = ShopItemsDetails.name;
         everything[3] = ShopItemsDetails.description;
         everything[4] = ShopItemsDetails.cost;
         everything[5] = ShopItemsDetails.rarity;
         everything[6] = ShopItemsDetails.stock;
         everything[7] = ShopItemsDetails.itemImage;
         everything[8] = ShopItemsDetails.effects;
         everything[9] = ShopItemsDetails.series;
      }

   }


   return everything;
}
module.exports = { checkItemExist }