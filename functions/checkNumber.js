const Discord = require("discord.js")
async function checkNumber(numberToCheck) {

   let temporary;
   temporary = parseInt(numberToCheck, 10);
   if (!Number.isInteger(temporary)) {
      numberToCheck = 0;
   }
   return numberToCheck;
}
module.exports = { checkNumber }