const Discord = require("discord.js")
async function getEmoji(k) {

   let emoji = "";
   if (k === 0) {
      emoji = "<:8heads:946522004822052914>"; // 8 heads
   } else if (k === 1) {
      emoji = "<:1head:946522003383386142>"; // 1 head
   } else if (k === 2) {
      emoji = "<:gold1:942056622262472744>"; // dazz star * 2
   } else if (k === 3) {
      emoji = "<:lhead:947934041183748126>"; // legendary sc
   } else if (k === 4) {
      emoji = "<:15g:946527122472726619>"; //15 hr speed up
   } else if (k === 5) {
      emoji = "<:8r:946527002641449020>"; // 8 hr r
   } else if (k === 6) {
      emoji = "<:8t:946527048350982175>";// 8 hr t
   } else if (k === 7) {
      emoji = "<:8b:946527090197540894>";// 8 hr b
   } else if (k === 8) {
      emoji = "<:g200000:938503916566503424>"; //gold
   } else if (k === 9) {
      emoji = "<:s375000:938503823234850866>"; //stone
   } else if (k === 10) {
      emoji = "<:f500000:938503629369933874>"; //food
   } else if (k === 11) {
      emoji = "<:w500000:938503732256190474>"; //wood
   }
   return emoji;
}
module.exports = { getEmoji }