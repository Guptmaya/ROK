const Discord = require("discord.js")
const emojiCharacters = require('../emojiCharacters');
const millifyPackage = require("millify")
const suCalculation = require("../functions/speed-ups")
const prefix = require("../config.json")
module.exports = {
  name: 'su',
  desciption: 'help command',
  guildOnly: true,
  usage: '[type of speed ups: gneric/others]',
  cooldown: 5,
  args: true,
  async execute(bot, message, args) {
    if (message.author.id != "541467870819778562") return;
    let typeOfSpeedUp = args[0];
    typeOfSpeedUp = typeOfSpeedUp.toLowerCase();
    if (typeOfSpeedUp === "generic" || typeOfSpeedUp === "global" || typeOfSpeedUp === "g") {
      typeOfSpeedUp = "g";
    } else if ((typeOfSpeedUp === "others" || typeOfSpeedUp === "building") || (typeOfSpeedUp === "training" || typeOfSpeedUp === "research") || (typeOfSpeedUp === "other" || typeOfSpeedUp === "o")) {
      typeOfSpeedUp = "o";
    } else {
      let failEmbed = new Discord.MessageEmbed()
        .setTitle("Command Failed")
        .setColor("RED")
        .setDescription("\`r!su\` : This command let's you calculate total speed ups in hours and days.\n\n" +
          "\*\*How To Use This Command ?\*\* - \`r!su [type of speed up]\`\n" +
          "\*\*For example : \*\* \n" +
          "\`r!su o\` : To calculate building or research or training speed ups\n" +
          "\`r!su g\` : To calculate global/generic speed ups\n\n")
      return message.channel.send({ embeds: [failEmbed] });
    }

    const filter1 = b => b.author.id === message.author.id;
    let incremental = 0;
    let ap = [];
    var amount = [];
    let questions = [];
    questions[0] = `${emojiCharacters[1]} Enter the amount of \*\*1-Minute Speedup.\*\*`;
    questions[1] = `${emojiCharacters[2]} Enter the amount of \*\*5-Minute Speedup.\*\*`;
    questions[2] = `${emojiCharacters[3]} Enter the amount of \*\*10-Minute Speedup.\*\*`;
    questions[3] = `${emojiCharacters[4]} Enter the amount of \*\*15-Minute Speedup.\*\*`;
    questions[4] = `${emojiCharacters[5]} Enter the amount of \*\*30-Minute Speedup.\*\*`;
    questions[5] = `${emojiCharacters[6]} Enter the amount of \*\*60-Minute Speedup.\*\*`;
    questions[6] = `${emojiCharacters[7]} Enter the amount of \*\*3-Hour Speedup.\*\*`;
    questions[7] = `${emojiCharacters[8]} Enter the amount of \*\*8-Hour Speedup.\*\*`;
    questions[8] = `${emojiCharacters[9]} Enter the amount of \*\*15-Hour Speedup.\*\*`;
    let description = "";

    let embed = new Discord.MessageEmbed()
      .setTitle("SPEED UPS CALCULATOR")
      .setColor("WHITE")
      .setDescription(description)
      .setFooter("Type cancel to quit.")

    let mainEmbed;
    let mainQuestion;
    let firstMessage;
    mainQuestion = await message.channel.send(questions[0]).then(async value => {
      firstMessage = value.id;
      mainEmbed = await message.channel.send({ embeds: [embed] });
    });

    async function takeInput() {
      message.channel.awaitMessages({ filter: filter1, max: 1, time: 300000 })
        .then(async value1 => {
          let check1 = value1.first().content;
          if (check1 === "quit" || check1 === "cancel") return message.channel.send("\*\*Process Cancelled\*\*: Happy Barb Hunting.");

          amount[incremental] = parseInt(check1, 10);
          console.log(amount[incremental]);
          if (!Number.isInteger(amount[incremental])) return message.channel.send("\*\*Process Cancelled\*\* : Please mention numerical value next time.");
          else {
            ap[incremental] = amount[incremental];
            message.channel.messages.fetch(firstMessage)
              .then(messageFetched => {
                messageFetched.edit(questions[incremental + 1]).then(value => {
                  if (incremental === 0) {
                    description += `\*\*1-Minute Speedup :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 1) {
                    description += `\*\*5-Minute Speedup :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 2) {
                    description += `\*\*10-Minute Speedup :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 3) {
                    description += `\*\*15-Minute Speedup :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 4) {
                    description += `\*\*30-Minute Speedup :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 5) {
                    description += `\*\*60-Minute Speedup :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 6) {
                    description += `\*\*3-Hour Speedup :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 7) {
                    description += `\*\*8-Hour Speedup :\*\* ${ap[incremental]}\n`;
                  } else if (incremental === 8) {
                    description += `\*\*15-Hour Speedup :\*\* ${ap[incremental]}\n`;
                  }

                  embed.setDescription(description);
                  mainEmbed.edit({ embeds: [embed] });
                  incremental++;
                  console.log(incremental)
                  if (incremental < 4) { takeInput(); }
                  else {
                    let result = suCalculation.calculateSpeedUps(ap[0], ap[1], ap[2], ap[3], ap[4], ap[5], ap[6], ap[7], ap[8]);
                    description += `\n\`Total Speedups : ${millifyPackage.millify(result)}\``;
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