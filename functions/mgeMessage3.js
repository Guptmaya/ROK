const Discord = require("discord.js")
const millifyPackage = require("millify")
async function getLastMessage(day, args1, args2, args3, type) {

   let description = "";
   if (type === "normal") { //if user wants to calculate total points
      if (day === "day1") {
         description = `\n\n\*\*Troop Tier :\*\* \`\`${args1.toUpperCase()}\`\`\n` +
            `\*\*Number Of Troops :\*\* \`\`${args2}\`\`\n` +
            `\*\*Total Points Gained :\*\* \`\`${args3}\`\``;
      } else if (day === "day2") {
         description = `\n\n\*\*Barbarians Level :\*\* \`\`${args1}\`\`\n` +
            `\*\*Number Of Barbs :\*\* \`\`${args2}\`\`\n` +
            `\*\*Total Points Gained : \*\*\`\`${args3}\`\``;
      } else if (day === "day3") {
         description = `\n\n\*\*Resource : \*\*\`\`${args1.toUpperCase()}\`\`\n` +
            `\*\*Amount Of Rss Gathered :\*\* \`\`${args2}\`\`\n` +
            `\*\*Total Points Gained :\*\* \`\`${args3}\`\``;
      } else if (day === "day4") {
         args1 = args1.toLowerCase();
         if (args1 === "b") {
            args1 = "Building"
         } else if (args1 === "t") {
            args1 = "Training"
         } else if (args1 === "r") {
            args1 = "Research"
         }
         description = `\n\n\*\*Upgraded :\*\* \`\`${args1.toUpperCase()}\`\`\n` +
            `\*\*Total Power Upgraded :\*\* \`\`${args2}\`\`\n` +
            `\*\*Total Points Gained :\*\* \`\`${args3}\`\``;
      } else if (day === "day5") {
         description = `\n\n\*\*Troop Tier :\*\* \`\`${args1.toUpperCase()}\`\`\n` +
            `\*\*Number Of Enemies Killed :\*\* \`\`${args2}\`\`\n` +
            `\*\*Total Points Gained : \*\*\`\`${args3}\`\``;
      }
   } else if (type === "reverse") {   //if user want to know what theses many points require
      if (day === "day1") {
         description = `\n\n\*\*Number of Points : \*\*\`${millifyPackage.millify(args1)}\`\n` +
            "You will need to train \*\*any one\*\* of these number of troops.\n" +
            `\`\`\`\n T1 :   ${millifyPackage.millify(args3[0])} \n` +
            ` T2 :   ${millifyPackage.millify(args3[1])} \n` +
            ` T3 :   ${millifyPackage.millify(args3[2])} \n` +
            ` T4 :   ${millifyPackage.millify(args3[3])} \n` +
            ` T5 :   ${millifyPackage.millify(args3[4])} \n\`\`\``;
      } else if (day === "day2") {
         description = `\n\n\*\*Number of Points : \*\*\`${millifyPackage.millify(args1)}\`\n` +
            "You will need to kill \*\*any one\*\* of these number of barbarians.\n" +
            `\`\`\`\n Level 1-6 :   ${millifyPackage.millify(args3[0])} \n` +
            ` Level 7-9 : ${millifyPackage.millify(args3[1])} \n` +
            ` Level 10-12 : ${millifyPackage.millify(args3[2])} \n` +
            ` Level 13-15 : ${millifyPackage.millify(args3[3])} \n` +
            ` Level 16,17 : ${millifyPackage.millify(args3[4])} \n` +
            ` Level 18,19 : ${millifyPackage.millify(args3[5])} \n` +
            ` Level 20 : ${millifyPackage.millify(args3[6])} \n` +
            ` Level 21 : ${millifyPackage.millify(args3[7])} \n` +
            ` Level 22 : ${millifyPackage.millify(args3[8])} \n` +
            ` Level 23 : ${millifyPackage.millify(args3[9])} \n` +
            ` Level 24 : ${millifyPackage.millify(args3[10])} \n` +
            ` Level 25 : ${millifyPackage.millify(args3[11])} \n` +
            ` Level 26-30 : ${millifyPackage.millify(args3[12])} \n` +
            ` Level 31-35 : ${millifyPackage.millify(args3[13])} \n` +
            ` Level 36-40 : ${millifyPackage.millify(args3[14])} \n` +
            ` Level 41-55 : ${millifyPackage.millify(args3[15])} \n\`\`\``;
      } else if (day === "day3") {
         description = `\n\n\*\*Number of Points : \*\*\`${millifyPackage.millify(args1)}\`\n` +
            "You will need to gather \*\*any one\*\* of these number of resources.\n" +
            `\`\`\`\n Food/Wood :   ${millifyPackage.millify(args3[0])} \n` +
            ` Stone :   ${millifyPackage.millify(args3[1])} \n` +
            ` Gold :   ${millifyPackage.millify(args3[2])} \n` +
            ` Gems :   ${millifyPackage.millify(args3[3])} \n\`\`\``;
      } else if (day === "day4") {
         description = `\n\n\*\*Number of Points : \*\*\`${millifyPackage.millify(args1)}\`\n` +
            "You will need to upgrade \*\*any one\*\* of this amount of power.\n" +
            `\`\`\`\n Building :   ${millifyPackage.millify(args3[0])} \n` +
            ` Research :   ${millifyPackage.millify(args3[1])} \n` +
            ` Training :   ${millifyPackage.millify(args3[2])} \n\`\`\``;
      } else if (day === "day5") {
         description = `\n\n\*\*Number of Points : \*\*\`${millifyPackage.millify(args1)}\`\n` +
            "You will need to kill \*\*any one\*\* of these number of troops.\n" +
            `\`\`\`\n T1 :   ${millifyPackage.millify(args3[0])} \n` +
            ` T2 :   ${millifyPackage.millify(args3[1])} \n` +
            ` T3 :   ${millifyPackage.millify(args3[2])} \n` +
            ` T4 :   ${millifyPackage.millify(args3[3])} \n` +
            ` T5 :   ${millifyPackage.millify(args3[4])} \n\`\`\``;
      }
   }

   return description;
}
module.exports = { getLastMessage }