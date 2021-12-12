const Discord = require("discord.js")
async function calculateMGEKillingReverse(amount) {

   let t = [];
   t[0] = amount / 1;
   t[1] = amount / 2;
   t[2] = amount / 4;
   t[3] = amount / 8;
   t[4] = amount / 20;

   return t;
}
module.exports = { calculateMGEKillingReverse }