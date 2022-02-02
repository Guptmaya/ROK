const Discord = require("discord.js")
const emojiCharacters = require('../emojiCharacters');
const apCalculation = require("../functions/actionPoints")
const millifyPackage = require("millify")
const checkInteger = require("../functions/checkNumber")
module.exports = {
  name: 'ap',
  desciption: 'Calculates Action Points',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 5,
  args: false,
  async execute(bot, message, args) {

    const filter1 = b => b.author.id === message.author.id;
    let incremental = 0; //counter variable
    let ap = []; //actual AP array
    var amount = []; //temporary holder


    //attach image to embeds
    let imageNameFormat = `./images/emergencyActionPoints.png`
    let file1 = new Discord.MessageAttachment(imageNameFormat);
    let cardImage1 = `attachment://emergencyActionPoints.png`;

    //emojis
    let emergencyAP = "<:emergencyAP:938246839403151411>";
    let basicAP = "<:basicAP:938246916586741770>";
    let intermediateAP = "<:intermediateAP:938246963269357598>";
    let legendaryAP = "<:emergencyAP:938246839403151411>";


    //questions shown to user
    let questions = [];
    questions[0] = `${emojiCharacters[1]} Enter the amount of ${emergencyAP} \*\*50 : Emergency Action Point Recovery Packs.\*\*`;
    questions[1] = `${emojiCharacters[2]} Enter the amount of ${basicAP} \*\*100 : Basic Action Point Recovery Packs.\*\*`;
    questions[2] = `${emojiCharacters[3]} Enter the amount of ${intermediateAP} \*\*500 : Intermediate Action Point Recovery Packs.\*\*`;
    questions[3] = `${emojiCharacters[4]} Enter the amount of ${legendaryAP} \*\*1000 : Legendary Action Point Recovery Packs.\*\*`;

    let description = "";
    let embed = new Discord.MessageEmbed()
      .setTitle("ACTION POINTS CALCULATOR")
      .setColor("DARK_GREEN")
      .setThumbnail(cardImage1)
      .setDescription(description)
      .setFooter("Type cancel to quit.")

    let mainEmbed;
    let mainQuestion;
    let firstMessage; //first question's id

    //first question sent details
    mainQuestion = await message.channel.send(questions[0]).then(async value => {
      firstMessage = value.id;
      mainEmbed = await message.channel.send({ embeds: [embed], files: [file1] });
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
                    description += `${emergencyAP} \*\*Emergency AP :\*\* ${ap[incremental]}\n`;
                  } else if (incremental == 1) {
                    description += `${basicAP} \*\*Basic AP :\*\* ${ap[incremental]}\n`;
                  } else if (incremental == 2) {
                    description += `${intermediateAP} \*\*Intermediate AP :\*\* ${ap[incremental]}\n`;
                  } else if (incremental == 3) {
                    description += `${legendaryAP} \*\*Legendary AP :\*\* ${ap[incremental]}\n`;
                  }

                  embed.setDescription(description);
                  mainEmbed.edit({ embeds: [embed], files: [file1] });
                  incremental++;
                  console.log(incremental)
                  if (incremental < 4) { takeInput(); }
                  else {
                    let result = await apCalculation.calculateActionPoints(ap[0], ap[1], ap[2], ap[3]);
                    description += `\n\`Total Action Points : ${result}\``;
                    embed.setDescription(description);
                    mainEmbed.edit({ embeds: [embed], files: [file1] });
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