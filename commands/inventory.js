const Discord = require("discord.js")
const usersProfile = require("../schemas/userProfile")
const mainFunction = require("../functions/checkInv")
const mainFunction2 = require("../functions/checkInv2")
const shop = require('../schemas/shop')
const mongoose = require("mongoose")
const paginator = require("../functions/shopPaginator")
module.exports = {
  name: 'inventory',
  desciption: 'inventory of user',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 5,
  args: false,
  async execute(bot, message, args) {

    let argPassed = args.join(" ");

    //check is user has a shop profile with bot or not; create one
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

    let embedArray = [];
    let firstDescription = '';
    let nameList = [];
    let idList = [];
    let totalNumberOfItems = 0;

    //For specific series
    if (argPassed) {
      //check is the series even has any item in database
      let seriesExistOrNot = await shop.findOne({ series: { $regex: `^${argPassed}$`, $options: 'i' } })
        .catch(err => console.log(err))
      if (!seriesExistOrNot) return message.channel.send("This series does not exist in database.");

      //function to get all items for specific series
      let answer = await mainFunction.checkItemExist(argPassed, message);
      totalNumberOfItems = answer[0];
      idList = answer[1];
      nameList = answer[2];

      //frontend
      firstDescription = `${argPassed.toUpperCase()}(${totalNumberOfItems})\n\n`;
      sendEmbeds(firstDescription, nameList, idList);
    }
    //whole inventory
    else {
      //function to get all items for specific series
      let answer = await mainFunction2.checkItemExist(message);
      totalNumberOfItems = answer[0];
      idList = answer[1];
      nameList = answer[2];

      //frontend
      firstDescription = `Total Items : ${totalNumberOfItems} \n\n`;
      sendEmbeds(firstDescription, nameList, idList);

    }



    async function sendEmbeds(firstDescription, nameList, idList) {
      //frontend
      let totalDocs = await idList.length;
      let numberOfPages = Math.ceil(totalDocs / 10);
      let pageCounter = 1;
      let counter = 0;
      let tempTitle = message.author.username;
      tempTitle = `${tempTitle}'s Inventory`

      for (var i = 1; i <= totalDocs; i++) {
        firstDescription += `\*\*${nameList[i - 1]}\*\*\n` +
          `\*ID \*  \`${idList[i - 1]}\`   \n\n`;

        if (i % 10 == 0 && pageCounter < numberOfPages) {
          let embedCut = new Discord.MessageEmbed()
            .setTitle(tempTitle)
            .setColor("RED")
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(firstDescription)
            .setFooter(`You can run \`item-info\`to get item details - Page ${pageCounter} of ${numberOfPages}`)
          embedArray[counter] = embedCut;
          firstDescription = '';
          counter++;
          pageCounter++;
        } else if (pageCounter === numberOfPages) {
          let embedCut = new Discord.MessageEmbed()
            .setTitle(tempTitle)
            .setColor("RED")
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(firstDescription)
            .setFooter(`You can run \`item-info\`to get item details - Page ${pageCounter} of ${numberOfPages}`)
          embedArray[counter] = embedCut;
        }
      }
      paginator(message, embedArray);
    }

  },
};