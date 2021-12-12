const Discord = require("discord.js")
async function calculateActionPoints(e, a, b, c, d, e, f, g) {

   let totalRss = 0;
   if ((e === "food" || e === "corn") || e === "wood") {
      totalRss = a * 1000 + b * 10000 + c * 50000 + d * 150000 + e * 500000 + f * 1500000 + g * 5000000;
   }

   return points;
}
module.exports = { calculateActionPoints }