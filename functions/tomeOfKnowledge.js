const Discord = require("discord.js")
const millifyPackage = require("millify")
async function calculateTOK(a, b, c, d, e, f, g) {

   var points = a * 100 + b * 500 + c * 1000 + d * 5000 + e * 10000 + f * 20000 + g * 50000;
   points = millifyPackage.millify(points);
   return points;
}
module.exports = { calculateTOK }