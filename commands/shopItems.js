const Discord = require("discord.js")
const emojiCharacters = require('../emojiCharacters');
const shop = require('../schemas/shop')
const mongoose = require("mongoose")
const checkInteger = require("../functions/checkNumber")
module.exports = {
  name: 'add-item',
  desciption: 'Adds item to shop',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 5,
  args: false,
  async execute(bot, message, args) {

    const filter1 = b => b.author.id === message.author.id;
    let incremental = 0; //counter variable
    let inputArray = []; //actual inputArray array
    var userInput = []; //temporary holder
    let itemNumber = 0;
    function randomINt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }

    //questions shown to user
    let questions = [];
    questions[0] = `${emojiCharacters[1]} \*\*Enter the name of item.\*\*`;
    questions[1] = `${emojiCharacters[2]} \*\*Enter the description of.\*\*`;
    questions[2] = `${emojiCharacters[3]} \*\*Enter the series item belongs to.\*\*`;
    questions[3] = `${emojiCharacters[4]} \*\*Enter the stock(0,1..so on OR -1) of item.\*\*`;
    questions[4] = `${emojiCharacters[5]} \*\*Enter the cost of item.\*\*`;
    questions[5] = `${emojiCharacters[6]} \*\*Enter the image for item.\*\*`;
    questions[6] = `${emojiCharacters[7]} \*\*Enter the effects of item.\*\*`;
    questions[7] = `${emojiCharacters[8]} \*\*Enter the rarity(C,E,L,M) of item.\*\*`

    let description = "";
    let embed = new Discord.MessageEmbed()
      .setTitle("Adding Item to Shop")
      .setColor("DARK_GREEN")
      .setDescription(description)
      .setFooter("Type CANCEL to quit.")

    let mainEmbed;
    let mainQuestion;
    let firstMessage; //first question's id
    let rarityOfItem = '';
    //first question sent details
    mainQuestion = await message.channel.send(questions[0]).then(async value => {
      firstMessage = value.id;
      mainEmbed = await message.channel.send({ embeds: [embed] });
    });

    //take input from user, number of action point tokens
    async function takeInput() {
      message.channel.awaitMessages({ filter: filter1, max: 1, time: 300000 })
        .then(async value1 => {
          let check1 = value1.first().content;
          if (check1.toLowerCase() === "quit" || check1.toLowerCase() === "cancel") return message.channel.send("\*\*Process Cancelled\*\*");

          //convert string to number
          userInput[incremental] = check1;

          //Exception : same name exists
          let ShopItemsDetails = await shop.findOne({ name: userInput[0] });
          if (ShopItemsDetails) {
            return message.channel.send("Item with same name exists.");
          }
          //Exception : stock/cost irrelevant
          let inventory = parseInt(userInput[3], 10);
          let costOfItem = parseInt(userInput[4], 10);
          if (checkInteger.checkNumber(inventory) === 0) return message.channel.send("\*\*Process Cancelled\*\* : Please mention numerical value for stock next time.");
          if (checkInteger.checkNumber(costOfItem) === 0) return message.channel.send("\*\*Process Cancelled\*\* : Please mention numerical value for cost next time.");

          //Exception : rarity
          if (incremental > 6) {
            rarityOfItem = userInput[7];
            if (rarityOfItem) {
              rarityOfItem = rarityOfItem.toLowerCase();
            }
            if ((rarityOfItem === "c" || rarityOfItem === "e") || (rarityOfItem === "l" || rarityOfItem === "m")) {
              if (rarityOfItem === "c") { rarityOfItem = "Common"; }
              else if (rarityOfItem === "e") { rarityOfItem = "Epic"; }
              else if (rarityOfItem === "l") { rarityOfItem = "Legendary"; }
              else if (rarityOfItem === "m") { rarityOfItem = "Mythical"; }
            } else {
              return message.channel.send("\*\*Process Cancelled\*\* : Please mention [c/e/l/m] value for rarity next time.");
            }
          }
          inputArray[incremental] = userInput[incremental];
          message.channel.messages.fetch(firstMessage) // get the message sent before, first question
            .then(async messageFetched => {
              messageFetched.edit(questions[incremental + 1]).then(async value => {
                if (incremental == 0) {
                  description += `\*\*Name :\*\* ${inputArray[incremental]}\n`;
                } else if (incremental == 1) {
                  description += `\*\*Description :\*\* ${inputArray[incremental]}\n`;
                } else if (incremental == 2) {
                  description += `\*\*Series :\*\* ${inputArray[incremental]}\n`;
                } else if (incremental == 3) {
                  description += `\*\*Stock :\*\* ${inputArray[incremental]}\n`;
                } else if (incremental == 4) {
                  description += `\*\*Cost :\*\* ${inputArray[incremental]}\n`;
                } else if (incremental == 5) {
                  description += `\*\*Image :\*\* ${inputArray[incremental]}\n`;
                } else if (incremental == 6) {
                  description += `\*\*Effects :\*\* ${inputArray[incremental]}\n`;
                } else if (incremental == 7) {
                  description += `\*\*Rarity :\*\* ${inputArray[incremental]}\n`;
                }

                embed.setDescription(description);
                mainEmbed.edit({ embeds: [embed] });
                incremental++;
                console.log(incremental)
                if (incremental < 8) { takeInput(); }
                else {

                  //create item number
                  let totalDocs = await shop.countDocuments();
                  console.log(totalDocs);
                  itemNumber = 100000 + totalDocs;

                  //create stock
                  if (inputArray[3] === "-1") {
                    inventory = "Infinite";
                  } else {
                    inventory = inputArray[3]
                  }

                  //add data to database
                  ShopItemsDetails = await new shop({
                    _id: mongoose.Types.ObjectId(),
                    itemID: itemNumber,
                    name: inputArray[0],
                    description: inputArray[1],
                    series: inputArray[2],
                    stock: inventory,
                    cost: inputArray[4],
                    rarity: rarityOfItem,
                    effects:inputArray[6],
                    itemImage: inputArray[5]
                  });
                  await ShopItemsDetails.save().catch(err => console.log(err)).then(value => {//save data in database and send success message
                    description += `\n\`Item successfully added.\nItem Number : ${itemNumber}\``;
                    embed.setDescription(description);
                    mainEmbed.edit({ embeds: [embed] });
                  })

                }
              })
            })
            .catch(console.error);


          //  }
        }).catch(err => {
          console.log(err + "Incorrect Syntax");
        })
    }

    takeInput();
  },
};