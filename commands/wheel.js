const Discord = require("discord.js")
const getLastEmbed = require("../functions/wheelEmbed.js")
const getEmojis = require("../functions/wheelEmojis")
module.exports = {
  name: 'wheel',
  desciption: 'Simulates rok wheel',
  guildOnly: true,
  cooldown: 5,
  args: false,
  async execute(bot, message, args) {

    if (args[0] === "chest" || args[0] === "chests") {
      let lastEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Wheel Chests")
        .setDescription(await getLastEmbed.getdescription())
        .setFooter("Bot By Uta")
      message.channel.send({ embeds: [lastEmbed] })
    }
    else if (args[0] === "spin" || args[0] === "spins") {


      var numberOfSpins = 100;

      //main embed description
      let description = `Click \*\*Once\*\* to spin wheel once.\n ` +
        `Click \*\*5 Times\*\* to spin wheel five times.\n `;

      //emotes
      let allemoji = [];
      allemoji[0] = "<:8heads:946522004822052914>"; // 8 heads
      allemoji[1] = "<:1head:946522003383386142>"; // 1 head
      allemoji[2] = "<:gold1:942056622262472744>"; // dazz star * 2
      allemoji[3] = "<:lhead:947934041183748126>"; // legendary sc
      allemoji[4] = "<:15g:946527122472726619>"; //15 hr speed up
      allemoji[5] = "<:8r:946527002641449020>"; // 8 hr r
      allemoji[6] = "<:8t:946527048350982175>";// 8 hr t
      allemoji[7] = "<:8b:946527090197540894>";// 8 hr b
      allemoji[8] = "<:g200000:938503916566503424>"; //gold
      allemoji[9] = "<:s375000:938503823234850866>"; //stone
      allemoji[10] = "<:f500000:938503629369933874>"; //food
      allemoji[11] = "<:w500000:938503732256190474>"; //wood

      //first embed to show
      let MainEmbed = new Discord.MessageEmbed()
        .setTitle("Wheel of Fortune")
        .setColor("GOLD")
        .setDescription(description)
        .setFooter("Bot by Uta.")

      //get random number
      function getRand(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

      //check which item i got from random number
      let counterArray = new Array(12).fill(0);
      console.log(counterArray[0]);
      function whichIncreased(rand) {
        let temporaryArray = [...counterArray];
        if (rand >= 1 && rand <= 2) { // legendary 8
          counterArray[0]++;
        } else if (rand >= 3 && rand <= 25) {// legendary 1
          counterArray[1]++;
        } else if (rand >= 26 && rand <= 39) {// dazzling starlight 2
          counterArray[2]++;
        } else if (rand >= 40 && rand <= 47) {// legendary sculpture 1
          counterArray[3]++;
        } else if (rand >= 48 && rand <= 53) {// 15 hr speed up 3
          counterArray[4]++;
        } else if (rand >= 54 && rand <= 61) {// 8 hr r speed up 4
          counterArray[5]++;
        } else if (rand >= 62 && rand <= 69) {// 8 hr t speed up 4
          counterArray[6]++;
        } else if (rand >= 70 && rand <= 77) {// 8 hr b speed up 4
          counterArray[7]++;
        } else if (rand >= 78 && rand <= 82) {// gold 4
          counterArray[8]++;
        } else if (rand >= 83 && rand <= 88) {// stone 4
          counterArray[9]++;
        } else if (rand >= 89 && rand <= 94) {// wood 4
          counterArray[10]++;
        } else if (rand >= 95 && rand <= 100) {// food 4
          counterArray[11]++;
        }
        let incrementedIndex = 0;
        for (let i = 0; i < counterArray.length; i++) {
          if (counterArray[i] > temporaryArray[i]) {
            incrementedIndex = i;
          }
        }
        console.log(incrementedIndex)
        //console.log(" 0 index : " + counterArray[0]);
        return incrementedIndex;
      }

      //buttons
      const btn1 = new Discord.MessageButton()
        .setLabel('Once ')
        .setCustomId("00000000000001")
        .setStyle("SECONDARY")

      const btn2 = new Discord.MessageButton()
        .setLabel('5 Times')
        .setCustomId("00000000000010")
        .setStyle("SECONDARY")

      const row = new Discord.MessageActionRow()
        .addComponents([btn1, btn2])

      const btn1After = new Discord.MessageButton()
        .setLabel('Once')
        .setCustomId("00000000000100")
        .setStyle("SECONDARY")
        .setDisabled()

      const btn2After = new Discord.MessageButton()
        .setLabel('5 Times')
        .setCustomId("00000000000101")
        .setStyle("SECONDARY")
        .setDisabled()

      const deadRow1 = new Discord.MessageActionRow().addComponents([btn1After, btn2After]) //both buttons locked
      const deadRow2 = new Discord.MessageActionRow().addComponents([btn1, btn2After]) //lock 5 spins button

      const curPage = await message.channel.send({ embeds: [MainEmbed], components: [row] })
      const filter = (b) => ['00000000000001', '00000000000010'].includes(b.customId) && b.user.id === message.author.id;
      const col = await curPage.channel.createMessageComponentCollector({ filter, time: 120000 });

      col.on('collect', async button => {
        await button.deferUpdate();

        //function to display all items user got
        function createformat() {
          let tempdesc = ``;
          for (let k = 0; k < allemoji.length; k++) {
            tempdesc += `${allemoji[k]}: ${counterArray[k]}, `;
          }
          return tempdesc;
        }

        //if clicked once button
        if (button.customId == '00000000000001') { // one spin
          numberOfSpins--;
          let indexTosend = whichIncreased(getRand(1, 100));
          // run function in loop
          let emoji = await getEmojis.getEmoji(indexTosend);
          let temporarydescription = `\*\*Number of times wheel spun =\*\* \`${100 - numberOfSpins}\`\n\n` +
            `\*\*Current spin item =\*\* ${emoji}\n\n` +
            `\*\*Items from ${100 - numberOfSpins} spins\*\* = ${createformat()}\n\n`;
          MainEmbed.setDescription(temporarydescription);
        }

        //if clicked 5 times button
        else if (button.customId == '00000000000010') { // 5 spins
          numberOfSpins -= 5;
          let indexTosend = [];
          let fiveEmoji = [];
          let temporarydescription = `\*\*Number of times wheel spun =\*\* \`${100 - numberOfSpins}\`\n\n\*\*Current spin items =\*\* `;
          for (let i = 0; i < 5; i++) {
            indexTosend[i] = whichIncreased(getRand(1, 100));
            fiveEmoji[i] = await getEmojis.getEmoji(indexTosend[i]);
            temporarydescription += `${fiveEmoji[i]}, `;
          }
          temporarydescription += `\n\n\*\*Items from ${100 - numberOfSpins} spins\*\* = ${createformat()}\n\n`;
          MainEmbed.setDescription(temporarydescription);
        }

        //which buttons to show when spins are incremented each time
        if (numberOfSpins - 1 < 0) { // 1 spins
          await curPage.edit({ embeds: [MainEmbed], components: [deadRow1] });
          if (numberOfSpins === 0) { // 0 spins left
            col.stop();
            return;
          }
        } else if (numberOfSpins - 5 < 0) { // 5 spins
          await curPage.edit({ embeds: [MainEmbed], components: [deadRow2] });
          if (numberOfSpins === 0) { // 0 spins left
            col.stop();
            return;
          }
        } else {
          await curPage.edit({ embeds: [MainEmbed], components: [row] });
        }

      })

      col.on('end', async () => {
        if (!curPage.deleted) {
          await curPage.edit({ embeds: [MainEmbed], components: [deadRow1] })
        }
      })
    } else {
      let wheelHelpEmbed = new Discord.MessageEmbed()
        .setTitle("Wheel Help")
        .setColor("GOLD")
        .setDescription("Use one of the following commands :\n\n" +
          "\`r!wheel chest\` - To check chest rewards from spinning wheel.\n" +
          "\`r!wheel spin\` - To simulate wheel spinning.")
        .setFooter("Bot By Uta")

      message.channel.send({ embeds: [wheelHelpEmbed] });

    }
  },
};