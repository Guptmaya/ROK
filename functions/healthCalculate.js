const Discord = require("discord.js")
const Levels = require('discord-xp');
const adh = require("../json/commanders.json")
const UserProfile = require("../schemas/userProfile")
async function calculateHealth(mentionedMember, userTarget,message) {
   //find which commander user is using
   let whichCommander = "";
   let UserProfileDetails = await UserProfile.findOne({ userID: mentionedMember.id })
      .then(value => {
         whichCommander = value.primaryCommander;
      })
      .catch(err => {
         console.log(err);
      })


   whichCommander = whichCommander.toLowerCase();

   //get index of which commander user is using
   let whichIndex = 0;
   for (let i = 0; i < adh.commanders.length; i++) {
      if (adh.commanders[i].name === whichCommander) {
         whichIndex = i;
      }
   }

   //get primary skill stats
   let attack = adh.commanders[whichIndex].skillL1[0];
   let health = adh.commanders[whichIndex].skillL1[1];

   //user level
   const target = await Levels.fetch(mentionedMember.id, message.guild.id);

   //total attack and health after level boost addition
   let totalAttack = attack + ((attack + target.level) * 5) / 100;
   let totalHealth = health + ((health + target.level) * 2) / 100;

   if (userTarget === "barbarian" && adh.commanders[whichIndex].speciality === "peacekeeper") {
      totalAttack += (totalAttack * 10) / 100;
   }

   return totalHealth;
}
module.exports = { calculateHealth }