const Discord = require("discord.js")
const millifyPackage = require("millify")
async function calculateResources(which, a, b, c, d, e, f, g) {

   let totalRss = 0;
   if (which === "Food" || which === "Wood") {
      totalRss = a * 1000 + b * 10000 + c * 50000 + d * 150000 + e * 500000 + f * 1500000 + g * 5000000;
   } else if (which === "Stone") {
      totalRss = a * 750 + b * 7500 + c * 37500 + d * 112500 + e * 375000 + f * 1125000 + g * 3750000;
   } else if (which === "Gold") {
      totalRss = a * 500 + b * 3000 + c * 15000 + d * 50000 + e * 200000 + f * 600000 + g * 2000000;
   }
   totalRss = millifyPackage.millify(totalRss);
   return totalRss;
}
module.exports = { calculateResources }