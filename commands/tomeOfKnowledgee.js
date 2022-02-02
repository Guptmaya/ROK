const Discord = require("discord.js")
const emojiCharacters = require('../emojiCharacters');
const apCalculation = require("../functions/tomeOfKnowledge")
const millifyPackage = require("millify")
const checkInteger = require("../functions/checkNumber")
module.exports = {
  name: 'tok',
  desciption: 'Calculates Tome Of Knowledge',
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
    let imageNameFormat = `./images/tok.png`
    let file1 = new Discord.MessageAttachment(imageNameFormat);
    let cardImage1 = `attachment://tok.png`;
    
    //questions shown to user
    let questions = [];
    questions[0] = `${emojiCharacters[1]} Enter the amount of <:tok1:938483039934218331> \*\*100 : Lvl 1 Tome of Knowledge.\*\*`;
    questions[1] = `${emojiCharacters[2]} Enter the amount of <:tok2:938483085807329311> \*\*500 : Lvl 2 Tome of Knowledge.\*\*`;
    questions[2] = `${emojiCharacters[3]} Enter the amount of <:tok3:938483134880698430> \*\*1000 : Lvl 3 Tome of Knowledge.\*\*`;
    questions[3] = `${emojiCharacters[4]} Enter the amount of <:tok4:938483194372689920> \*\*5000 : Lvl 4 Tome of Knowledge.\*\*`;
    questions[4] = `${emojiCharacters[5]} Enter the amount of <:tok5:938483250446352434> \*\*10,000 : Lvl 5 Tome of Knowledge.\*\*`;
    questions[5] = `${emojiCharacters[6]} Enter the amount of <:tok6:938483312136183868> \*\*20,000 : Lvl 6 Tome of Knowledge.\*\*`;
    questions[6] = `${emojiCharacters[7]} Enter the amount of <:tok7:938483357942161438> \*\*50,000 : Lvl 7 Tome of Knowledge.\*\*`;

    let description = "";
    let embed = new Discord.MessageEmbed()
      .setTitle("TOME OF KNOWLEDGE CALCULATOR")
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
      mainEmbed = await message.channel.send({ embeds: [embed], files: [file1]  });
    });

    //take input from user, number of action point tokens
    async function takeInput() {
      message.channel.awaitMessages({ filter: filter1, max: 1, time: 300000 })
        .then(async value1 => {
          let check1 = value1.first().content;
          if (check1 === "quit" || check1 === "cancel") return message.channel.send("\*\*Process Cancelled\*\*");

          //convert string to number
          amount[incremental] = parseInt(check1, 10);

          //if amount is number calculate AP, run loop
          if (checkInteger.checkNumber(amount[incremental]) === 0) return message.channel.send("\*\*Process Cancelled\*\* : Please mention numerical value next time.");
          else {
            ap[incremental] = amount[incremental];
            message.channel.messages.fetch(firstMessage) // get the message sent before, first question
              .then(async messageFetched => {
                messageFetched.edit(questions[incremental + 1]).then(async value => {
                  if (incremental === 0) {
                    description += `<:tok1:938483039934218331> \*\*Lvl 1 TOK :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 1) {
                    description += `<:tok2:938483085807329311> \*\*Lvl 2 TOK :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 2) {
                    description += `<:tok3:938483134880698430> \*\*Lvl 3 TOK :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 3) {
                    description += `<:tok4:938483194372689920> \*\*Lvl 4 TOK :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 4) {
                    description += `<:tok5:938483250446352434> \*\*Lvl 5 TOK :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 5) {
                    description += `<:tok6:938483312136183868> \*\*Lvl 6 TOK :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 6) {
                    description += `<:tok7:938483357942161438> \*\*Lvl 7 TOK :\*\* ${ap[incremental]}\n`;
                  }

                  embed.setDescription(description);
                  mainEmbed.edit({ embeds: [embed], files: [file1]  });
                  incremental++;
                  console.log(incremental)
                  if (incremental < 7) { takeInput(); }
                  else {
                    let result = await apCalculation.calculateTOK(ap[0], ap[1], ap[2], ap[3], ap[4], ap[5], ap[6]);
                    description += `\n\`Total Tome Of Knowledge : ${result}\``;
                    embed.setDescription(description);
                    mainEmbed.edit({ embeds: [embed], files: [file1]  });
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