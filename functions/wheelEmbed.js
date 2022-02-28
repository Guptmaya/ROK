const Discord = require("discord.js")
async function getdescription() {

   let allemoji = [];
   allemoji[0] = "<:1head:946522003383386142>"; // 1 head
   allemoji[1] = "<:lhead:947934041183748126>"; // legendary sc
   allemoji[2] = "<:24g:947941886608416810>"; //24 hr speed up
   allemoji[3] = "<:8r:946527002641449020>"; // 8 hr r
   allemoji[4] = "<:8t:946527048350982175>";// 8 hr t
   allemoji[5] = "<:8b:946527090197540894>";// 8 hr b
   allemoji[6] = "<:g200000:938503916566503424>"; //gold
   allemoji[7] = "<:s375000:938503823234850866>"; //stone
   allemoji[8] = "<:f500000:938503629369933874>"; //food
   allemoji[9] = "<:w500000:938503732256190474>"; //wood

   let description =
      `\`\`\`10 Spins Chest\`\`\``+
      `${allemoji[0]}\*\* : 5\*\*\n\n` +
      `\`\`\`25 Spins Chest\`\`\``+
      `${allemoji[1]}\*\* : 5\*\*, ` +
      `${allemoji[9]}\*\* : 5\*\*, ` +
      `${allemoji[8]}\*\* : 5\*\*, ` +
      `${allemoji[7]}\*\* : 5\*\*, ` +
      `${allemoji[6]}\*\* : 5\*\*\n\n`+
      `\`\`\`45 Spins Chest\`\`\``+
      `${allemoji[0]}\*\* : 10\*\*\n\n` +
      `\`\`\`70 Spins Chest\`\`\``+
      `${allemoji[1]}\*\* : 10\*\*, ` +
      `${allemoji[2]}\*\* : 1\*\*,  ` +
      `${allemoji[3]}\*\* : 3\*\*, ` +
      `${allemoji[4]}\*\* : 3\*\*, ` +
      `${allemoji[5]}\*\* : 3\*\*\n\n` +
      `\`\`\`100 Spins Chest\`\`\``+
      `${allemoji[0]}\*\* : 15\*\*\n` ;

   return description;
}
module.exports = { getdescription }