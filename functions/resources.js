const Discord = require("discord.js")
const millifyPackage = require("millify")
async function calculateResources(which, a, b, c, d, e, f, g) {

   let totalRss = 0;
   if (which === "food" || which === "wood") {
      totalRss = a * 1000 + b * 10000 + c * 50000 + d * 150000 + e * 500000 + f * 1500000 + g * 5000000;
   } else if (which === "stone") {
      totalRss = a * 1000 + b * 10000 + c * 50000 + d * 150000 + e * 500000 + f * 1500000 + g * 5000000;
   }
   totalRss = millifyPackage.millify(totalRss);
   return totalRss;
}
module.exports = { calculateResources }