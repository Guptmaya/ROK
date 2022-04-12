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
   let barbLevel = barbStats.barbs[barbChoosen].level;
   let barbAttack = barbStats.barbs[barbChoosen].attack;
   let barbHealth = barbStats.barbs[barbChoosen].health;
   console.log("barbarian choosen " + barbAttack + " " + barbHealth);

   //get user's att and health
   let userTotalAttack = await userAttack.calculateAdh(msg.author, "barbarian", msg);
   let userTotalHealth = await userHealth.calculateHealth(msg.author, "barbarian", msg);
   console.log("User's Attack " + userTotalAttack);
   console.log("User's Health " + userTotalHealth);

   //get att-health on both parts
   let userAttackOnBarb = userTotalAttack - barbHealth;
   let barbAttackOnUser = barbAttack - userTotalHealth;
   console.log("user.A -> Barb.H " + userAttackOnBarb);
   console.log("barb.A -> user.H " + barbAttackOnUser);

   if (userAttackOnBarb > barbAttackOnUser) {
      whoWon = "user";
      console.log("user")
   } else {
      whoWon = "barb";
      console.log("barb")
   }

   return [whoWon,barbLevel,Math.floor(barbAttack),Math.floor(barbHealth),Math.floor(userTotalAttack),Math.floor(userTotalHealth)];
}
module.exports = { calculateWinner }