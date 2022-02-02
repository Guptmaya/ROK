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
    if (message.author.id != "541467870819778562") return;
    const filter1 = b => b.author.id === message.author.id;
    let incremental = 0; //counter variable
    let ap = []; //actual AP array
    var amount = []; //temporary holder

    //questions shown to user
    let questions = [];
    questions[0] = `${emojiCharacters[1]} Enter the amount of \*\*100 : Lvl 1 Tome of Knowledge.\*\*`;
    questions[1] = `${emojiCharacters[2]} Enter the amount of \*\*500 : Lvl 2 Tome of Knowledge.\*\*`;
    questions[2] = `${emojiCharacters[3]} Enter the amount of \*\*1000 : Lvl 3 Tome of Knowledge.\*\*`;
    questions[3] = `${emojiCharacters[4]} Enter the amount of \*\*5000 : Lvl 4 Tome of Knowledge.\*\*`;
    questions[4] = `${emojiCharacters[5]} Enter the amount of \*\*10,000 : Lvl 5 Tome of Knowledge.\*\*`;
    questions[5] = `${emojiCharacters[6]} Enter the amount of \*\*20,000 : Lvl 6 Tome of Knowledge.\*\*`;
    questions[6] = `${emojiCharacters[7]} Enter the amount of \*\*50,000 : Lvl 7 Tome of Knowledge.\*\*`;
    
    let description = "";
    let embed = new Discord.MessageEmbed()
      .setTitle("TOME OF KNOWLEDGE CALCULATOR")
      .setColor("DARK_GREEN")
      .setDescription(description)
      .setFooter("Type cancel to quit.")

    let mainEmbed;
    let mainQuestion;
    let firstMessage; //first question's id

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
                  if (incremental === 0) {
                    description += `\*\*Lvl 1 TOK :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 1) {
                    description += `\*\*Lvl 2 TOK :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 2) {
                    description += `\*\*Lvl 3 TOK :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 3) {
                    description += `\*\*Lvl 4 TOK :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 4) {
                    description += `\*\*Lvl 5 TOK :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 5) {
                    description += `\*\*Lvl 6 TOK :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 7) {
                    description += `\*\*Lvl 7 TOK :\*\* ${ap[incremental]}\n`;
                  }

                  embed.setDescription(description);
                  mainEmbed.edit({ embeds: [embed] });
                  incremental++;
                  console.log(incremental)
                  if (incremental < 7) { takeInput(); }
                  else {
                    let result = await apCalculation.calculateTOK(ap[0], ap[1], ap[2], ap[3], ap[4], ap[5], ap[6]);
                    description += `\n\`Total Tome Of Knowledge : ${result}\``;
                    embed.setDescription(description);
                    mainEmbed.edit({ embeds: [embed] });
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