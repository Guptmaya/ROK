const Discord = require("discord.js")
async function calculateSpeedUps(oneMin, fiveMin, tenMin, fifteenMin, thirtyMin, sixtyMin, threeHours, eightHours, fifteenHours, twentyFourHours, threeDays, sevenDays, thirtyDays) {
   var minutes = oneMin * 1 + fiveMin * 5 + tenMin * 10 + fifteenMin * 15 + thirtyMin * 30;
   var minutesToHours = Math.floor(minutes / 60);
   var Hours = minutesToHours + sixtyMin + threeHours * 3 + eightHours * 8 + fifteenHours * 15 + twentyFourHours * 24 + threeDays * 72 + sevenDays * 168 + thirtyDays * 720;
   return Hours;
}
module.exports = { calculateSpeedUps }