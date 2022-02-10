const Discord = require("discord.js")
const millifyPackage = require("millify")
async function calculateGems(a, b, c, d,dd, e, f, g, h) {

   var points = a * 5 + b * 10 + c * 50 + d * 100 + dd * 200 + e * 500 + f * 650 + g * 1000 + h * 2000;
   if (points > 100000) {
      points = millifyPackage.millify(points);
   }

   return points;
}
module.exports = { calculateGems }