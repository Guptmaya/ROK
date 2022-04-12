const Discord = require("discord.js")
const userAttack = require("../functions/attackCalculate")
const userHealth = require("../functions/healthCalculate")
const barbStats = require("../json/barbarians.json")
async function calculateWinner(msg) {

   let whoWon = "barb";
   //min inclusive, max exclusive
   function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
   }
   let barbChoosen = getRandomArbitrary(0, 5);
   console.log(barbChoosen);
   //get user's att and health
   let userTotalAttack = await userAttack.calculateAdh(msg.author, "barbarian", msg);
   let userTotalHealth = await userHealth.calculateHealth(msg.author, "barbarian", msg);
   console.log(userTotalAttack);
   console.log(userTotalHealth);

   //get att-health on both parts
   let userAttackOnBarb = userTotalAttack - barbStats.barbs[barbChoosen].health;
   let barbAttackOnUser = barbStats.barbs[barbChoosen].attack - userTotalHealth;
   console.log(userAttackOnBarb);
   console.log(barbAttackOnUser);

   if (userAttackOnBarb > barbAttackOnUser ) {
      whoWon = "user";
      console.log("user")
   } else {
      whoWon = "barb";
      console.log("barb")
   }

   return whoWon;
}
module.exports = { calculateWinner }