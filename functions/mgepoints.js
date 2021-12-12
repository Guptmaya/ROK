const Discord = require("discord.js")
async function calculateMGEPoints(tier, amount) {

   var points = 0;
   if (tier === "t1") {
      points = 5;
   } else if (tier === "t2") {
      points = 10;
   } else if (tier === "t3") {
      points = 20;
   } else if (tier === "t4") {
      points = 40;
   } else if (tier === "t5") {
      points = 100;
   } else {
      points = 0;
   }

   points = points * amount;
   return points;
}
module.exports = { calculateMGEPoints }