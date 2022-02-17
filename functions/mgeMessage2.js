const Discord = require("discord.js")
const millifyPackage = require("millify");
async function getPoints(day, args1, args2, normalReverse) {

   var points = 0;
   let tier = [];
   if (normalReverse === "normal") { //if user wants to calculate total points
      args1 = args1.toLowerCase();
      args2 = parseInt(args2, 10);
      //troop training calc
      if (day === "day1") {
         if (args1 === "t1") {
            points = 5;
         } else if (args1 === "t2") {
            points = 10;
         } else if (args1 === "t3") {
            points = 20;
         } else if (args1 === "t4") {
            points = 40;
         } else if (args1 === "t5") {
            points = 100;
         } else {
            points = 0;
         }
         points = points * args2;
      }//defeat barbs
      else if (day === "day2") {
         if (args1 === "1" || args1 === "2" || args1 === "3" || args1 === "4" || args1 === "5" || args1 === "6") {
            points = 300;
         } else if (args1 === "7" || args1 === "8" || args1 === "9") {
            points = 600;
         } else if (args1 === "10" || args1 === "11" || args1 === "12") {
            points = 900;
         } else if (args1 === "13" || args1 === "14" || args1 === "15") {
            points = 1200;
         } else if (args1 === "16" || args1 === "17") {
            points = 1500;
         } else if (args1 === "18" || args1 === "19") {
            points = 1800;
         } else if (args1 === "20") {
            points = 2100;
         } else if (args1 === "21") {
            points = 2400;
         } else if (args1 === "22") {
            points = 2700;
         } else if (args1 === "23") {
            points = 3000;
         } else if (args1 === "24") {
            points = 3300;
         } else if (args1 === "25") {
            points = 3600;
         } else if (args1 === "26" || args1 === "27" || args1 === "28" || args1 === "29" || args1 === "30") {
            points = 4000;
         } else if (args1 === "31" || args1 === "32" || args1 === "33" || args1 === "34" || args1 === "35") {
            points = 4500;
         } else if (args1 === "36" || args1 === "37" || args1 === "38" || args1 === "39" || args1 === "40") {
            points = 5000;
         } else if (args1 === "41" || args1 === "42" || args1 === "43" || args1 === "44" || args1 === "45") {
            points = 10000;
         } else if (args1 === "46" || args1 === "47" || args1 === "48" || args1 === "49" || args1 === "50") {
            points = 10000;
         } else if (args1 === "51" || args1 === "52" || args1 === "53" || args1 === "54" || args1 === "55") {
            points = 10000;
         } else {
            points = 0;
         }
         points = points * args2;
      } //gathering rss
      else if (day === "day3") {
         if (args1 === "food" || args1 === "wood") {
            points = 1;
         } else if (args1 === "stone") {
            points = 2;
         } else if (args1 === "gold") {
            points = 5;
         } else if (args1 === "gems" || args1 === "gem") {
            points = 150;
         } else {
            points = 0;
         }
         if (args1 === "gems" || args1 === "gem") { points = points * args2; }
         else { points = points * Math.floor(args2 / 100); }
      }//power upgrade
      else if (day === "day4") {
         if (args1 === "b" || args1 === "t" || args1 === "r") {
            points = 2;
         } else if (args1 === "building" || args1 === "training" || args1 === "research") {
            points = 2;
         } else {
            points = 0;
         }
         points = points * args2;

      } //kill enemies
      else if (day === "day5") {
         if (args1 === "t1") {
            points = 1;
         } else if (args1 === "t2") {
            points = 2;
         } else if (args1 === "t3") {
            points = 4;
         } else if (args1 === "t4") {
            points = 8;
         } else if (args1 === "t5") {
            points = 20;
         } else {
            points = 0;
         }
         points = points * args2;
      }
      
      console.log(points);
      points = Math.floor(points);
      
      console.log(points);
      if (points > 9999) {
         points = millifyPackage.millify(points);
      }
      console.log(points);
      return points;
   } else {   //if user want to know what theses many points require
      args1 = parseInt(args1, 10);
      //troop training calc
      if (day === "day1") {
         let t1 = args1 / 5;
         let t2 = args1 / 10;
         let t3 = args1 / 20;
         let t4 = args1 / 40;
         let t5 = args1 / 100;
         tier = [t1, t2, t3, t4, t5];
      }//defeat barbs
      else if (day === "day2") {
         let b1 = args1 / 300;
         let b2 = args1 / 600;
         let b3 = args1 / 900;
         let b4 = args1 / 1200;
         let b5 = args1 / 1500;
         let b6 = args1 / 1800;
         let b7 = args1 / 2100;
         let b8 = args1 / 2400;
         let b9 = args1 / 2700;
         let b10 = args1 / 3000;
         let b11 = args1 / 3300;
         let b12 = args1 / 3600;
         let b13 = args1 / 4000;
         let b14 = args1 / 4500;
         let b15 = args1 / 5000;
         let b16 = args1 / 10000;
         tier = [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16];
      } //gathering rss
      else if (day === "day3") {
         let gems = (args1 / 150) * 1;
         let gold = (args1 / 5) * 100;
         let stone = (args1 / 2) * 100;
         let food = (args1 / 1) * 100;

         tier = [food, stone, gold, gems];
      }//power upgrade
      else if (day === "day4") {
         let b = args1 / 2;
         tier = [b, b, b];

      } //kill enemies
      else if (day === "day5") {
         let t1 = args1 / 1;
         let t2 = args1 / 2;
         let t3 = args1 / 4;
         let t4 = args1 / 8;
         let t5 = args1 / 20;
         tier = [t1, t2, t3, t4, t5];
      }
      console.log(tier);
      return tier;
   }


}
module.exports = { getPoints }