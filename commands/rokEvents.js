const Discord = require("discord.js")
const eventsInfo = require("../json/events.json")
const paginator = require("../functions/ButtonPaginator")
module.exports = {
  name: 'event',
  desciption: 'Events Info',
  guildOnly: true,
  usage: '<event`s name>',
  aliases: ['events'],
  cooldown: 5,
  args: true,
  async execute(bot, message, args) {
    if (message.author.id != "541467870819778562") return;
    let eventName = " ";
    let eventBasic = " ";
    let eventHowTo = " ";
    let eventTips = " ";
    let eventImage = " ";

    //join args and check if we have info about it in json file
    let rokEvent = args.join(" ");
    rokEvent = rokEvent.toLowerCase();
    let iFound = 0;
    for (let i = 0; i < eventsInfo.events.length; i++) {
      if (eventsInfo.events[i].name.toLocaleLowerCase() === rokEvent) {
        eventName = eventsInfo.events[i].name;
        eventBasic = eventsInfo.events[i].basicKnowledge;
        eventHowTo = eventsInfo.events[i].howToBeat;
        eventTips = eventsInfo.events[i].tips;
        eventImage = eventsInfo.events[i].image;
        iFound = i;
      }
    }
    console.log(eventBasic)
    console.log(eventHowTo)
    console.log(eventTips)
    console.log(eventName)
    console.log(eventImage)

    //attach image to embeds
    let imageNameFormat = `./images/${eventImage}`
    let file1 = new Discord.MessageAttachment(imageNameFormat);
    let cardImage1 = `attachment://${eventImage}`;

    let title = [];
    title[0] = eventName;
    title[1] = `${title[0]}'s Basic Knowledge`;
    title[2] = `How to beat ${title[0]}`;
    title[3] = `Tips for ${title[0]}`;

    let e1 = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle(title[1])
      .setDescription(eventBasic)
      .setImage(cardImage1)
      .setFooter("Flip the pages to get more info.")

    let e2 = new Discord.MessageEmbed()
      .setColor("#DD993C")
      .setTitle(title[2])
      .setImage(cardImage1)
      .setDescription(eventHowTo)
      .setFooter("Flip the pages to get more info.");

    let e3 = new Discord.MessageEmbed()
      .setColor("#48D4E2")
      .setTitle(title[3])
      .setImage(cardImage1)
      .setDescription(eventTips)
      .setFooter("Flip the pages to get more info.");


    let pages = [e1, e2, e3];
    paginator(iFound, message, pages);
  },
};