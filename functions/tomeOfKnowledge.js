const Discord = require("discord.js")
async function calculateTomesOfKnowledge(a, b, c, d, e, f, g) {

   var points = a * 100 + b * 5000 + c * 1000 + d * 5000 + e * 10000 + f * 20000 + g * 50000;

   return points;
}
module.exports = { calculateTomesOfKnowledge }