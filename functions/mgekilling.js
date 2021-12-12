const Discord = require("discord.js")
async function calculateMGEKilling(tier, amount) {

   var points = 0;
   if (tier === "t1") {
      points = 1;
   } else if (tier === "t2") {
      points = 2;
   } else if (tier === "t3") {
      points = 4;
   } else if (tier === "t4") {
      points = 8;
   } else if (tier === "t5") {
      points = 20;
   } else {
      points = 0;
   }
   points = points * amount;

   return points;
}
module.exports = { calculateMGEKilling }