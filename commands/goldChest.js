const Discord = require("discord.js")
const prefix = require("../config.json")
const goldy = require("../functions/goldChest")
const checkInteger = require("../functions/checkNumber")
module.exports = {
  name: 'goldchest',
  desciption: 'help command',
  guildOnly: true,
  usage: '[number of keys]',
  cooldown: 5,
  args: true,
  async execute(bot, message, args) {


    /*LegendaryCommander = 0.78688%
      Epic = 2.35527%
      Elite = 3.42585
      LC sculpture = 3.06398
      Epic CS = 8.41735
      Elite CS= 15.49167
      Dazzling Starlight Sc = 4.92289
      Brand new Starlight sc = 9.84578
      Rss = 17.23011
      speedup = 12.92258
      tok = 21.53764
    */

    let numberOfKeys;

    numberOfKeys = parseInt(args[0], 10);

    //if amount is number calculate AP, run loop
    if (checkInteger.checkNumber(numberOfKeys) === 0) return message.channel.send("\*\*Process Cancelled\*\* : Please mention numerical value for number of gold keys.");
    if (numberOfKeys > 5000) return message.channel.send("Please enter number of keys less than 5000.");
    console.log(numberOfKeys)
    let counterArray = new Array(73).fill(0);
    //random value generator
    function getRand(min, max, decimalPlaces) {
      const rand = Math.random() * (max - min) + min;
      const precision = Math.pow(10, decimalPlaces);
      return Math.floor(rand * precision) / precision;
    }


    //main loop
    for (let i = 0; i < numberOfKeys; i++) {
      var rand = getRand(0, 100, 5);
      console.log(rand);

      if (rand > 0 && rand <= 0.78688) {
        let rand1 = getRand(1, 11, 0);
        if (rand1 === 1) {
          counterArray[0]++;
        } else if (rand1 === 2) {
          counterArray[1]++;
        } else if (rand1 === 3) {
          counterArray[2]++;
        } else if (rand1 === 4) {
          counterArray[3]++;
        } else if (rand1 === 5) {
          counterArray[4]++;
        } else if (rand1 === 6) {
          counterArray[5]++;
        } else if (rand1 === 7) {
          counterArray[6]++;
        } else if (rand1 === 8) {
          counterArray[7]++;
        } else if (rand1 === 9) {
          counterArray[8]++;
        } else if (rand1 === 10) {
          counterArray[9]++;
        } else if (rand1 === 11) {
          counterArray[10]++;
        }

      } else if (rand >= 0.78689 && rand <= 3.14215) {
        let rand2 = getRand(1, 14, 0);
        if (rand2 === 1) {
          counterArray[11]++;
        } else if (rand2 === 2) {
          counterArray[12]++;
        } else if (rand2 === 3) {
          counterArray[13]++;
        } else if (rand2 === 4) {
          counterArray[14]++;
        } else if (rand2 === 5) {
          counterArray[15]++;
        } else if (rand2 === 6) {
          counterArray[16]++;
        } else if (rand2 === 7) {
          counterArray[17]++;
        } else if (rand2 === 8) {
          counterArray[18]++;
        } else if (rand2 === 9) {
          counterArray[19]++;
        } else if (rand2 === 10) {
          counterArray[20]++;
        } else if (rand2 === 11) {
          counterArray[21]++;
        } else if (rand2 === 12) {
          counterArray[22]++;
        } else if (rand2 === 13) {
          counterArray[23]++;
        } else if (rand2 === 14) {
          counterArray[24]++;
        }
      } else if (rand >= 3.14216 && rand <= 6.56800) {
        let rand3 = getRand(1, 4, 0);
        if (rand3 === 1) {
          counterArray[25]++;
        } else if (rand3 === 2) {
          counterArray[26]++;
        } else if (rand3 === 3) {
          counterArray[27]++;
        } else if (rand3 === 4) {
          counterArray[28]++;
        }
      } else if (rand >= 6.56801 && rand <= 9.63198) {
        let rand4 = getRand(1, 11, 0);
        if (rand4 === 1) {
          counterArray[29]++;
        } else if (rand4 === 2) {
          counterArray[30]++;
        } else if (rand4 === 3) {
          counterArray[31]++;
        } else if (rand4 === 4) {
          counterArray[32]++;
        } else if (rand4 === 5) {
          counterArray[33]++;
        } else if (rand4 === 6) {
          counterArray[34]++;
        } else if (rand4 === 7) {
          counterArray[35]++;
        } else if (rand4 === 8) {
          counterArray[36]++;
        } else if (rand4 === 9) {
          counterArray[37]++;
        } else if (rand4 === 10) {
          counterArray[38]++;
        } else if (rand4 === 11) {
          counterArray[39]++;
        }
      } else if (rand >= 9.63199 && rand <= 18.04933) {
        let rand5 = getRand(1, 14, 0);
        if (rand5 === 1) {
          counterArray[40]++;
        } else if (rand5 === 2) {
          counterArray[41]++;
        } else if (rand5 === 3) {
          counterArray[42]++;
        } else if (rand5 === 4) {
          counterArray[43]++;
        } else if (rand5 === 5) {
          counterArray[44]++;
        } else if (rand5 === 6) {
          counterArray[45]++;
        } else if (rand5 === 7) {
          counterArray[46]++;
        } else if (rand5 === 8) {
          counterArray[47]++;
        } else if (rand5 === 9) {
          counterArray[48]++;
        } else if (rand5 === 10) {
          counterArray[49]++;
        } else if (rand5 === 11) {
          counterArray[50]++;
        } else if (rand5 === 12) {
          counterArray[51]++;
        } else if (rand5 === 13) {
          counterArray[52]++;
        } else if (rand5 === 14) {
          counterArray[53]++;
        }
      } else if (rand >= 18.04934 && rand <= 33.54100) {
        let rand6 = getRand(1, 4, 0);
        if (rand6 === 1) {
          counterArray[54]++;
        } else if (rand6 === 2) {
          counterArray[55]++;
        } else if (rand6 === 3) {
          counterArray[56]++;
        } else if (rand6 === 4) {
          counterArray[57]++;
        }
      } else if (rand >= 33.54101 && rand <= 38.46389) {
        let rand7 = getRand(1, 3, 0);
        if (rand7 === 1) {
          counterArray[58]++;
        } else if (rand7 === 2) {
          counterArray[59]++;
        } else if (rand7 === 3) {
          counterArray[60]++;
        }
      } else if (rand >= 38.46390 && rand <= 48.30967) {
        let rand8 = getRand(1, 3, 0);
        if (rand8 === 1) {
          counterArray[61]++;
        } else if (rand8 === 2) {
          counterArray[62]++;
        } else if (rand8 === 3) {
          counterArray[63]++;
        }
      } else if (rand >= 48.30968 && rand <= 65.53978) {
        let rand9 = getRand(1, 4, 0);
        if (rand9 === 1) {
          counterArray[64]++;
        } else if (rand9 === 2) {
          counterArray[65]++;
        } else if (rand9 === 3) {
          counterArray[66]++;
        } else if (rand9 === 4) {
          counterArray[67]++;
        }
      } else if (rand >= 65.53979 && rand <= 78.46236) {
        let rand10 = getRand(1, 3, 0);
        if (rand10 === 1) {
          counterArray[68]++;
        } else if (rand10 === 2) {
          counterArray[69]++;
        } else if (rand10 === 3) {
          counterArray[70]++;
        }
      } else if (rand >= 78.46237 && rand <= 100.00000) {
        let rand11 = getRand(1, 2, 0);
        if (rand11 === 1) {
          counterArray[71]++;
        } else if (rand11 === 2) {
          counterArray[72]++;
        }
      }
    }

    let incrementedArray = [];
    let counter = 0;
    for (let k = 0; k < 73; k++) {
      if (counterArray[k] > 0) {
        console.log(`${counterArray[k]}\n`);
        incrementedArray[counter] = k;
        counter++;
      }
    }


    let desc = "";
    async function createDescription() {
      let descc = "";
      for (let l = 0; l < incrementedArray.length; l++) {
        let emojii = await goldy.getEmoji(incrementedArray[l]);
        descc += `\u2008\u2008${emojii}:${counterArray[incrementedArray[l]]}\u2008\u2008`;
      }
      return descc;
    }

    desc = await createDescription();
    let embed = new Discord.MessageEmbed()
      .setTitle("Gold Chest")
      .setColor("GOLD")
      .setDescription(desc)
      .setFooter("The probability of items is same as in game.")
    message.channel.send({ embeds: [embed] })

  },
};