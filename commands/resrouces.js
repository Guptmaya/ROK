const Discord = require("discord.js")
const rssCalculator = require("../functions/resources")
module.exports = {
  name: 'rss',
  desciption: 'Calculates resources',
  guildOnly: true,
  cooldown: 5,
  args: false,
  async execute(bot, message, args) {
    if (message.author.id != "541467870819778562") return;

    let description = "React ✅ below to calculate Food or Wood.\n " +
      "React ✅ below to calculate Stone.\n " +
      "React ✅ below to calculate Gold.\n " +
      "React ✅ below to calculate Gems.\n ";

    //send main embed and let bot react 
    let Embed = new Discord.MessageEmbed()
    .setTitle("Resources Calculator")
    .setColor("AQUA")
    .setDescription(description)
    let msgEmbed = await message.channel.send({ embeds: [Embed] })
    msgEmbed.react('1️⃣')
      .then(reaction => reaction.message.react('2️⃣'))
      .then(reaction => reaction.message.react('3️⃣'))
      .then(reaction => reaction.message.react('4️⃣'))
      .catch(err => console.error);

      //check reactions and ask for input
    msgEmbed.awaitReactions((reaction, user) => user.id === message.author.id,
      { max: 1, time: 30000 }).then(async collected => {
        //check which reaction was reacted
        let whichRSS = '';
        if (collected.first().emoji.name === '1️⃣') {
          whichRSS = "food";
        } else if (collected.first().emoji.name === '1️⃣') {
          whichRSS = "stone";
        } else if (collected.first().emoji.name === '1️⃣') {
          whichRSS = "gold";
        } else if (collected.first().emoji.name === '1️⃣') {
          whichRSS = "gems";
        } else {
          return message.channel.send("\*\*Process Cancelled\*\*: Please react to one of the above emojis next time.");
        }
        totalRss = a * 1000 + b * 10000 + c * 50000 + d * 150000 + e * 500000 + f * 1500000 + g * 5000000;
   
        
        let questions = [];
        questions[0] = `${emojiCharacters[1]} Enter the amount of \*\*1000 : Lvl 1 Tome of Knowledge.\*\*`;
        questions[1] = `${emojiCharacters[2]} Enter the amount of \*\*10,000 : Lvl 2 Tome of Knowledge.\*\*`;
        questions[2] = `${emojiCharacters[3]} Enter the amount of \*\*50,000 : Lvl 3 Tome of Knowledge.\*\*`;
        questions[3] = `${emojiCharacters[4]} Enter the amount of \*\*150,000 : Lvl 4 Tome of Knowledge.\*\*`;
        questions[4] = `${emojiCharacters[5]} Enter the amount of \*\*500,000 : Lvl 5 Tome of Knowledge.\*\*`;
        questions[5] = `${emojiCharacters[6]} Enter the amount of \*\*1,500000 : Lvl 6 Tome of Knowledge.\*\*`;
        questions[6] = `${emojiCharacters[7]} Enter the amount of \*\*5,000000 : Lvl 7 Tome of Knowledge.\*\*`;


      }).catch(err => {
        console.log(err);
        let failEmbed = new Discord.MessageEmbed()
          .setDescription("Process Cancelled")
          .setFooter(`Be faster next time.`)
        return message.channel.send(failEmbed);
      });

  },
};