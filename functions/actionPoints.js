const Discord = require("discord.js")
async function calculateActionPoints(a, b, c, d) {

   var points = a * 50 + b * 100 + c * 500 + d * 1000;

   return points;
}
module.exports = { calculateActionPoints }