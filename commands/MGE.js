const Discord = require("discord.js")
const getLastMessagee = require("../functions/mgeMessage3")
const emojiCharacters = require('../emojiCharacters');
const millifyPackage = require("millify")
const getDayMessage = require("../functions/mgeMessage")
const getCalculatedPoints = require("../functions/mgeMessage2");
module.exports = {
  name: 'mge',
  desciption: 'Calculates MGE Points',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 5,
  args: false,
  async execute(bot, message, args) {

    const filter2 = (reaction, user) => user.id === message.author.id
    const filter3 = b => b.author.id === message.author.id;
    //emotes
    let day1Emote = emojiCharacters[1];
    let day2Emote = emojiCharacters[2];
    let day3Emote = emojiCharacters[3];
    let day4Emote = emojiCharacters[4];
    let day5Emote = emojiCharacters[5];
    let whichDay = "";

    //first embed show each day
    let description =
      `React to which Day's points you want to calculate.\n\n` +
      `Day ${day1Emote} : Troops Training \n` +
      `Day ${day2Emote} : Defeat Barbarians.\n ` +
      `Day ${day3Emote} : Gather Resources.\n ` +
      `Day ${day4Emote} : Increase Power.\n ` +
      `Day ${day5Emote} : Kill Enemies.\n `;

    //send main embed and let bot react 
    let Embed = new Discord.MessageEmbed()
      .setTitle("Mightiest Governor Calculator")
      .setColor("AQUA")
      .setDescription(description)
      .setFooter("Bot by Uta.")
    let msgEmbed = await message.channel.send({ embeds: [Embed] })
    msgEmbed.react(emojiCharacters[1])
      .then(reaction => reaction.message.react(emojiCharacters[2]))
      .then(reaction => reaction.message.react(emojiCharacters[3]))
      .then(reaction => reaction.message.react(emojiCharacters[4]))
      .then(reaction => reaction.message.react(emojiCharacters[5]))
      .catch(err => console.log(err));

    //check first reactions and ask for input
    msgEmbed.awaitReactions({ filter: filter2, max: 1, time: 30000 }).then(async collected => {
      //check which reaction was reacted

      if (collected.first().emoji.name === day1Emote) {
        whichDay = "day1";
      } else if (collected.first().emoji.name === day2Emote) {
        whichDay = "day2";
      } else if (collected.first().emoji.name === day3Emote) {
        whichDay = "day3";
      } else if (collected.first().emoji.name === day4Emote) {
        whichDay = "day4";
      } else if (collected.first().emoji.name === day5Emote) {
        whichDay = "day5";
      } else {
        return message.channel.send("\*\*Process Cancelled\*\*: Please react to one of the above emojis next time.");
      }
      console.log(whichDay);
      //msgEmbed.delete();
      let secondEmbed = new Discord.MessageEmbed()
        .setColor("AQUA")
        .setDescription(`React ${day1Emote} to calculate MGE Points.\n` +
          `React ${day2Emote} to reverse calculate from MGE Points.\n`)


      //remove all reaction and edit the message and let user choose which mode 
      //normal or reverse
      msgEmbed.reactions.removeAll()
        .catch(error => console.error('Failed to clear reactions:', error)).then(async value => {
          msgEmbed = await msgEmbed.edit({ embeds: [secondEmbed] })
          msgEmbed.react(emojiCharacters[1])
            .then(reaction => reaction.message.react(emojiCharacters[2]))
            .catch(err => console.log(err));


          //second reaction filter starts here
          msgEmbed.awaitReactions({ filter: filter2, max: 1, time: 30000 }).then(async collected => {
            //check which reaction was reacted
            let normalReverse = "";
            if (collected.first().emoji.name === day1Emote) {
              normalReverse = "normal";
            } else if (collected.first().emoji.name === day2Emote) {
              normalReverse = "reverse";
            } else {
              return message.channel.send("\*\*Process Cancelled\*\*: Please react to one of the above emojis next time.");
            }
            console.log(normalReverse);

            let title = whichDay.toUpperCase();
            if (whichDay === "day1") {
              title += " : Troop Training";
            } else if (whichDay === "day2") {
              title += " : Defeat Barbarians";
            } else if (whichDay === "day3") {
              title += " : Gather Resources";
            } else if (whichDay === "day4") {
              title += " : Increase Power";
            } else if (whichDay === "day5") {
              title += " : Kill Enemies";
            }
            //third embed, embed for input
            let thirdEmbed = new Discord.MessageEmbed()
              .setTitle(title)
              .setColor("AQUA")
            let description = await getDayMessage.getMessage(normalReverse, whichDay);
            thirdEmbed.setDescription(description)

            //removing first and second reactions
            msgEmbed.reactions.removeAll()
              .catch(error => console.error('Failed to clear reactions:', error)).then(async value => {
                msgEmbed = await msgEmbed.edit({ embeds: [thirdEmbed] })
                  .then(async collected => {
                    //will ask for user input here                
                    //user can enter the data and number of points
                    message.channel.awaitMessages({ filter: filter3, max: 1, time: 60000 })
                      .then(async value2 => {
                        let check2 = value2.first().content;
                        let contentArray = [];
                        if (check2.includes(",")) {
                          contentArray = check2.split(',');
                        } else if (check2.includes(" ")) {
                          contentArray = check2.split(' ');
                        }
                        if (normalReverse === "reverse") {
                          console.log(check2);
                          contentArray[0] = check2;
                        }
                        var amount = 0;
                        let args1 = "";
                        var args2 = 0;

                        if (contentArray.length > 2) return message.channel.send("Process Failed : More than required arguments entered. Please follow instruction carefully next time.");

                        if (normalReverse === "normal") {
                          amount = parseInt(contentArray[1], 10);
                          if (contentArray.length < 2) return message.channel.send("Process Failed : Please mention all the arguments asked next time.");
                          else if (!Number.isInteger(amount)) return message.channel.send("Process Failed : Please mention numerical amount.");
                          else {
                            args1 = contentArray[0];
                            args2 = contentArray[1];
                          }
                        }
                        else if (normalReverse === "reverse") {
                          amount = parseInt(contentArray[0], 10);
                          if (contentArray.length > 1) return message.channel.send("Process Failed : More than required arguments entered. Please follow instructions carefully next time.");
                          else if (!Number.isInteger(amount)) return message.channel.send("Process Failed : Please mention numerical amount.");
                          else {
                            args1 = contentArray[0];
                          }
                        }

                        let something = [];

                        let finalEmbed = new Discord.MessageEmbed()
                          .setTitle("Mightiest Governor Calculator")
                          .setColor("GREEN")
                        //.setAuthor(message.author.username, message.author.iconURL())
                        let lastEmbedDesc = ``;



                        if (normalReverse === "normal") {
                          something[0] = await getCalculatedPoints.getPoints(whichDay, args1, args2, normalReverse);

                          lastEmbedDesc = await getLastMessagee.getLastMessage(whichDay, args1, args2, something[0], "normal")
                          lastEmbedDesc = `\*\*${title}\*\*${lastEmbedDesc}`;
                          console.log(lastEmbedDesc);
                          finalEmbed.setDescription(lastEmbedDesc)
                          message.channel.send({ embeds: [finalEmbed] });
                        } else {
                          something[0] = await getCalculatedPoints.getPoints(whichDay, args1, args2, normalReverse);
                          lastEmbedDesc = await getLastMessagee.getLastMessage(whichDay, args1, 0, something[0], "reverse")
                          lastEmbedDesc = `\*\*${title}\*\*${lastEmbedDesc}`;
                          console.log(lastEmbedDesc);
                          finalEmbed.setDescription(lastEmbedDesc)
                          message.channel.send({ embeds: [finalEmbed] });
                        }

                      }).catch(err => {
                        console.log(err.stack);
                      })
                    //user input ends here
                  })
              });



          }).catch(err => {
            console.log(err);
            let failEmbed = new Discord.MessageEmbed()
              .setDescription("Process Cancelled")
              .setFooter(`Be faster next time.`)
            return message.channel.send(failEmbed);
          });
          //second reaction filter ends here
        });



    }).catch(err => {
      console.log(err);
      let failEmbed = new Discord.MessageEmbed()
        .setDescription("Process Cancelled")
        .setFooter(`Be faster next time.`)
      return message.channel.send(failEmbed);
    });


  },
};