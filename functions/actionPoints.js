const Discord = require("discord.js")
const millifyPackage = require("millify")
async function calculateActionPoints(a, b, c, d) {

   var points = a * 50 + b * 100 + c * 500 + d * 1000;
   points = millifyPackage.millify(points);
   return points;
}
module.exports = { calculateActionPoints }