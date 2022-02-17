const Discord = require("discord.js")
const millifyPackage = require("millify")
async function getMessage(type, day) {

   let messageSent = "";
   if (type === "normal") { //if user wants to calculate total points
      if (day === "day1") {
         messageSent = "Enter the \*\*Tier(t1 to t5)\*\* and \*\*Amount\*\* of troops you want to train.\n" +
            "For example : \`T4 20000\` : This means you want to train 20k T4\n" +
            "OR \`t5 1000000\` : This means you want to train 1M T5";
      }else if (day === "day2") {
         messageSent = "Enter the \*\*Level(1 to 55)\*\* and \*\*Amount\*\* of barbarians you want to kill.\n" +
            "For example : \`25 100\` : This means you want to kill 100 Level 25 Barbarians.\n" +
            "OR \`43 20\` : This means you want to kill 20 Level 43 Barbarians.";
      }else if (day === "day3") {
         messageSent = "Enter the \*\*Type(food/stone/gold/gems)\*\* and \*\*Amount\*\* of resources you want to gather.\n" +
            "For example : \`food 3000000\` : This means you want to gather 3M Food/Wood.\n" +
            "OR \`gold 1000\` : This means you want to gather 1000 Gold.";
      }else if (day === "day4") {
         messageSent = "Enter the \*\*Type(B/R/T)\*\* and \*\*Amount\*\* of Power you want to increase.\n" +
            "For example : \`B 3000000\` : This means you want to increase 3M building Power.\n" +
            "OR \`R 154782\` : This means you want to increase 154782 reasearch power.\n"+
            "Power gained from research/training/building upgrade gives same MGE points.";
      }else if (day === "day5") {
         messageSent = "Enter the \*\*Tier(t1 to T5)\*\* and \*\*Amount\*\* of enemies you want to kill.\n" +
            "For example : \`t1 300000\` : This means you want to kill 300k T1 troops.\n" +
            "OR \`T4 1000000\` : This means you want to kill 1M T4 troops.";
      }

   } else if (type === "reverse") {   //if user want to know what theses many points require
         messageSent = "Enter the \*\*Number of Points\*\* you need.\n" +
         "For example : \`2000000\`\n" +
         "OR \`5000000\`";
   }

   return messageSent;
}
module.exports = { getMessage }