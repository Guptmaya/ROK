const Discord = require("discord.js")
async function calculateMGEPointsReverse(numberOfPoints) {

   let t5 = numberOfPoints/100;
   let t4 = numberOfPoints/40;
   let t3 = numberOfPoints/20;
   let t2 = numberOfPoints/10;
   let t1 = numberOfPoints/5;

   let tier = [t1,t2,t3,t4,t5];
   return tier;
}
module.exports = { calculateMGEPointsReverse }