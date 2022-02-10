const Discord = require("discord.js")
const emojiCharacters = require('../emojiCharacters');
const apCalculation = require("../functions/gems")
const millifyPackage = require("millify")
const checkInteger = require("../functions/checkNumber")
module.exports = {
  name: 'gems',
  desciption: 'Calculates Gems',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 5,
  args: false,
  async execute(bot, message, args) {

    const filter1 = b => b.author.id === message.author.id;
    let incremental = 0; //counter variable
    let ap = []; //actual AP array
    var amount = []; //temporary holder

/*
    //attach image to embeds
    let imageNameFormat = `./images/gems.png`
    let file1 = new Discord.MessageAttachment(imageNameFormat);
    let cardImage1 = `attachment://gems.png`;
    */

    //emojis
    let g5 = "<:g5:941160838113411072>";
    let g10 = "<:g10:941160877787332698>";
    let g50 = "<:g50:941160914525229056>";
    let g100 = "<:g100:941160949908381696>";
    let g200 = "<:g100:941160949908381696>";
    let g500 = "<:g500:941160984947617812>";
    let g650 = "<:g650:941161020896972881>";
    let g1000 = "<:g5:938246839403151411>";
    let g2000 = "<:g2000:941161057521635339>";


    //questions shown to user
    let questions = [];
    questions[0] = `${emojiCharacters[1]} Enter the amount of ${g5} \*\*5 Gems.\*\*`;
    questions[1] = `${emojiCharacters[2]} Enter the amount of ${g10} \*\*10 Gems.\*\*`;
    questions[2] = `${emojiCharacters[3]} Enter the amount of ${g50} \*\*50 Gems.\*\*`;
    questions[3] = `${emojiCharacters[4]} Enter the amount of ${g100} \*\*100 Gems.\*\*`;
    questions[4] = `${emojiCharacters[5]} Enter the amount of ${g200} \*\*100 Gems.\*\*`;
    questions[5] = `${emojiCharacters[6]} Enter the amount of ${g500} \*\*500 Gems.\*\*`;
    questions[6] = `${emojiCharacters[7]} Enter the amount of ${g650} \*\*650 Gems.\*\*`;
    questions[7] = `${emojiCharacters[8]} Enter the amount of ${g1000} \*\*1000 Gems.\*\*`;
    questions[8] = `${emojiCharacters[9]} Enter the amount of ${g2000} \*\*2000 Gems.\*\*`;

    let description = "";
    let embed = new Discord.MessageEmbed()
      .setTitle("GEMS CALCULATOR")
      .setColor("DARK_GREEN")
      //.setThumbnail(cardImage1)
      .setDescription(description)
      .setFooter("Type cancel to quit.")

    let mainEmbed;
    let mainQuestion;
    let firstMessage; //first question's id

    //first question sent details
    mainQuestion = await message.channel.send(questions[0]).then(async value => {
      firstMessage = value.id;
      mainEmbed = await message.channel.send({ embeds: [embed]});
    });

    //take input from user, number of action point tokens
    async function takeInput() {
      message.channel.awaitMessages({ filter: filter1, max: 1, time: 300000 })
        .then(async value1 => {
          let check1 = value1.first().content;
          if (check1 === "quit" || check1 === "cancel") return message.channel.send("\*\*Process Cancelled\*\*: Happy Barb Hunting.");

          //convert string to number
          amount[incremental] = parseInt(check1, 10);

          //if amount is number calculate AP, run loop
          if (checkInteger.checkNumber(amount[incremental]) === 0) return message.channel.send("\*\*Process Cancelled\*\* : Please mention numerical value next time.");
          else {
            ap[incremental] = amount[incremental];
            message.channel.messages.fetch(firstMessage) // get the message sent before, first question
              .then(async messageFetched => {
                messageFetched.edit(questions[incremental + 1]).then(async value => {
                  if (incremental == 0) {
                    description += `${g5} \*\*5 Gems :\*\* ${ap[incremental]}\n`;
                  } else if (incremental == 1) {
                    description += `${g10} \*\*10 Gems :\*\* ${ap[incremental]}\n`;
                  } else if (incremental == 2) {
                    description += `${g50} \*\*50 Gems :\*\* ${ap[incremental]}\n`;
                  } else if (incremental == 3) {
                    description += `${g100} \*\*100 Gems :\*\* ${ap[incremental]}\n`;
                  } else if (incremental == 4) {
                    description += `${g200} \*\*200 Gems :\*\* ${ap[incremental]}\n`;
                  } else if (incremental == 5) {
                    description += `${g500} \*\*500 Gems :\*\* ${ap[incremental]}\n`;
                  } else if (incremental == 6) {
                    description += `${g650} \*\*650 Gems :\*\* ${ap[incremental]}\n`;
                  } else if (incremental == 7) {
                    description += `${g1000} \*\*1000 Gems :\*\* ${ap[incremental]}\n`;
                  } else if (incremental == 8) {
                    description += `${g2000} \*\*2000 Gems :\*\* ${ap[incremental]}\n`;
                  }

                  embed.setDescription(description);
                  mainEmbed.edit({ embeds: [embed]});
                  incremental++;
                  console.log(incremental)
                  if (incremental < 9) { takeInput(); }
                  else {
                    let result = await apCalculation.calculateGems(ap[0], ap[1], ap[2], ap[3], ap[4], ap[5], ap[6], ap[7], ap[8]);
                    description += `\n\`Total Gems : ${result}\``;
                    embed.setDescription(description);
                    mainEmbed.edit({ embeds: [embed]});
                  }
                })
              })
              .catch(console.error);


          }
        }).catch(err => {
          console.log(err + "Incorrect Syntax");
        })
    }

    takeInput();
  },
};