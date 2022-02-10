const Discord = require("discord.js")
const rssCalculator = require("../functions/resources")
const emojiCharacters = require('../emojiCharacters')
const millifyPackage = require("millify")
const rssCalculation = require("../functions/resources")
const checkInteger = require("../functions/checkNumber")
module.exports = {
  name: 'rss',
  desciption: 'Calculates resources',
  guildOnly: true,
  cooldown: 5,
  args: false,
  async execute(bot, message, args) {
    const filter2 = (reaction, user) => user.id === message.author.id

    //emotes
    let foodEmote = "<:food:938483406428315678>";
    let woodEmote = "<:wood:938483458961969224>";
    let stoneEmote = "<:stone:938483520232366103>";
    let goldEmote = "<:gold:938483575618154586>";

    let description = `React ${foodEmote} below to calculate Food.\n ` +
      `React ${woodEmote} below to calculate Wood.\n ` +
      `React ${stoneEmote} below to calculate Stone.\n ` +
      `React ${goldEmote} below to calculate Gold.\n `;

    //send main embed and let bot react 
    let Embed = new Discord.MessageEmbed()
      .setTitle("Resources Calculator")
      .setColor("AQUA")
      .setDescription(description)
      .setFooter("You can calculate one resource at a time.")
    let msgEmbed = await message.channel.send({ embeds: [Embed]})
    msgEmbed.react(foodEmote)
      .then(reaction => reaction.message.react(woodEmote))
      .then(reaction => reaction.message.react(stoneEmote))
      .then(reaction => reaction.message.react(goldEmote))
      .catch(err => console.log(err));

    //check reactions and ask for input
    msgEmbed.awaitReactions({ filter: filter2, max: 1, time: 30000 }).then(async collected => {
      //check which reaction was reacted
      let whichRSS = '';
      if (collected.first().emoji.id === "938483406428315678") {
        whichRSS = "Food";
      } else if (collected.first().emoji.id === "938483458961969224") {
        whichRSS = "Wood";
      } else if (collected.first().emoji.id === "938483520232366103") {
        whichRSS = "Stone";
      } else if (collected.first().emoji.id === "938483575618154586") {
        whichRSS = "Gold";
      } else {
        return message.channel.send("\*\*Process Cancelled\*\*: Please react to one of the above emojis next time.");
      }
      console.log(whichRSS);
      msgEmbed.delete();
      async function getInput() {

        const filter1 = b => b.author.id === message.author.id;
        let incremental = 0; //counter variable
        let ap = []; //actual AP array
        var amount = []; //temporary holder


        //attach image to main embeds
        let imageNameFormat = `./images/${whichRSS}.png`
        let file1 = new Discord.MessageAttachment(imageNameFormat);
        let cardImage1 = ` `;
        if (whichRSS === "Food") {
          cardImage1 = `attachment://Food.png`;
        } else if (whichRSS === "Wood") {
          cardImage1 = `attachment://Wood.png`;
        } else if (whichRSS === "Stone") {
          cardImage1 = `attachment://Stone.png`;
        } else if (whichRSS === "Gold") {
          cardImage1 = `attachment://Gold.png`;
        }

        //emojis
        let rss1 = " ";
        let rss2 = " ";
        let rss3 = " ";
        let rss4 = " ";
        let rss5 = " ";
        let rss6 = " ";
        let rss7 = " ";

        let rssValue1 = " ";
        let rssValue2 = " ";
        let rssValue3 = " ";
        let rssValue4 = " ";
        let rssValue5 = " ";
        let rssValue6 = " ";
        let rssValue7 = " ";
        function getEmotes(whichRSS) {
          if (whichRSS === "Food") {
            rss1 = "<:food:938483406428315678>";
            rss2 = "<:f10000:938503575246614568>";
            rss3 = "<:f50000:938503595358314587>";
            rss4 = "<:f150000:938503612932423730>";
            rss5 = "<:f500000:938503629369933874>";
            rss6 = "<:f1500000:941150851018412052>";
            rss7 = "<:f5000000:941153391869042708>";
            rssValue1 = "1000";
            rssValue2 = "10,000";
            rssValue3 = "50,000";
            rssValue4 = "150,000";
            rssValue5 = "500,000";
            rssValue6 = "1,500,000";
            rssValue7 = "5,000,000";
          } else if (whichRSS === "Wood") {
            rss1 = "<:wood:938483458961969224>";
            rss2 = "<:w10000:938503668246909018>";
            rss3 = "<:w50000:938503692917821440>";
            rss4 = "<:w150000:938503711930585138>";
            rss5 = "<:w500000:938503732256190474>";
            rss6 = "<:w1500000:938503749402501171>";
            rss7 = "<:w5000000:941153336403570688>";
            rssValue1 = "1000";
            rssValue2 = "10,000";
            rssValue3 = "50,000";
            rssValue4 = "150,000";
            rssValue5 = "500,000";
            rssValue6 = "1,500,000";
            rssValue7 = "5,000,000";
          } else if (whichRSS === "Stone") {
            rss1 = "<:stone:938483520232366103>";
            rss2 = "<:s7500:938503771850432553>";
            rss3 = "<:s37500:938503786689855519>";
            rss4 = "<:s112500:938503806554103838>";
            rss5 = "<:s375000:938503823234850866>";
            rss6 = "<:s1125000:938503840666365952>";
            rss7 = "<:s3750000:941153286424260618>";
            rssValue1 = "750";
            rssValue2 = "7500";
            rssValue3 = "37500";
            rssValue4 = "112,500";
            rssValue5 = "375,000";
            rssValue6 = "1,125,000";
            rssValue7 = "3,750,000";
          } else if (whichRSS === "Gold") {
            rss1 = "<:gold:938483575618154586>";
            rss2 = "<:g3000:938503853366726718>";
            rss3 = "<:g15000:938503885801275473>";
            rss4 = "<:g50000:938503902431707226>";
            rss5 = "<:g200000:938503916566503424>";
            rss6 = "<:g600000:941150919935008790>";
            rss7 = "<:g2000000:941153234150649906>";
            rssValue1 = "500";
            rssValue2 = "3000";
            rssValue3 = "15,000";
            rssValue4 = "50,000";
            rssValue5 = "200,000";
            rssValue6 = "600,000";
            rssValue7 = "2,000,000";
          }
        }
        getEmotes(whichRSS);
        console.log(rss1)


        //questions shown to user
        let questions = [];
        questions[0] = `${emojiCharacters[1]} Enter the amount of ${rss1} \*\*${rssValue1} ${whichRSS}\*\*`;
        questions[1] = `${emojiCharacters[2]} Enter the amount of ${rss2} \*\*${rssValue2} ${whichRSS}\*\*`;
        questions[2] = `${emojiCharacters[3]} Enter the amount of ${rss3} \*\*${rssValue3} ${whichRSS}\*\*`;
        questions[3] = `${emojiCharacters[4]} Enter the amount of ${rss4} \*\*${rssValue4} ${whichRSS}\*\*`;
        questions[4] = `${emojiCharacters[5]} Enter the amount of ${rss5} \*\*${rssValue5} ${whichRSS}\*\*`;
        questions[5] = `${emojiCharacters[6]} Enter the amount of ${rss6} \*\*${rssValue6} ${whichRSS}\*\*`;
        questions[6] = `${emojiCharacters[7]} Enter the amount of ${rss7} \*\*${rssValue7} ${whichRSS}\*\*`;


        let description = "";
        let embed = new Discord.MessageEmbed()
          .setTitle("RESOUCRCES CALCULATOR")
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
                      if (incremental == 0) {
                        description += `${rss1} \*\*${rssValue1} :\*\* ${ap[incremental]}\n`;
                      } else if (incremental == 1) {
                        description += `${rss2} \*\*${rssValue2} :\*\* ${ap[incremental]}\n`;
                      } else if (incremental == 2) {
                        description += `${rss3} \*\*${rssValue3} :\*\* ${ap[incremental]}\n`;
                      } else if (incremental == 3) {
                        description += `${rss4} \*\*${rssValue4} :\*\* ${ap[incremental]}\n`;
                      } else if (incremental == 4) {
                        description += `${rss5} \*\*${rssValue5} :\*\* ${ap[incremental]}\n`;
                      } else if (incremental == 5) {
                        description += `${rss6} \*\*${rssValue6} :\*\* ${ap[incremental]}\n`;
                      } else if (incremental == 6) {
                        description += `${rss7} \*\*${rssValue7} :\*\* ${ap[incremental]}\n`;
                      }

                      embed.setDescription(description);
                      mainEmbed.edit({ embeds: [embed], files: [file1] });
                      incremental++;
                      console.log(incremental)
                      if (incremental < 7) { takeInput(); }
                      else {
                        let result = await rssCalculation.calculateResources(whichRSS, ap[0], ap[1], ap[2], ap[3], ap[4], ap[5], ap[6]);
                        description += `\n\`Total ${whichRSS} : ${result}\``;
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
      }
      getInput();

    }).catch(err => {
      console.log(err);
      let failEmbed = new Discord.MessageEmbed()
        .setDescription("Process Cancelled")
        .setFooter(`Be faster next time.`)
      return message.channel.send(failEmbed);
    });

  },
};