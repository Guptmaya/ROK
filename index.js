const Discord = require("discord.js");
const fs = require('fs');
let logChannel = '917158209305858058';
const mongoose = require(`./database/mongoose`);
const mongooseDataPack = require("mongoose");
const { Client, Intents } = require('discord.js');
const Levels = require('discord-xp');
const usersProfile = require("./schemas/userProfile")
const bot = new Client({
   disableEveryone: true,
   intents: [Intents.FLAGS.GUILDS,
   Intents.FLAGS.GUILD_MESSAGES,
   Intents.FLAGS.GUILD_MEMBERS,
   Intents.FLAGS.GUILD_INTEGRATIONS,
   Intents.FLAGS.GUILD_PRESENCES,
   Intents.FLAGS.GUILD_MESSAGE_REACTIONS],

   partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const config = require('./config.json');

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cooldowns = new Discord.Collection();

//When bot is ready
bot.on("ready", async () => {
   mongoose.init();
   console.log('ready');
});


for (const files of commandFiles) {
   const command = require(`./commands/${files}`);
   bot.commands.set(command.name, command);
}





//for commands
bot.on("messageCreate", async message => {
   if (message.author.id != "541467870819778562") return;
   let prefix1 = config.prefix1;
   let prefix2 = config.prefix2;

   //bot channel
   let botChannel;
   botChannel = message.guild.channels.cache.find(x => x.id === "941473918911406131");
   let levelUpLogOfNetflix = message.guild.channels.cache.find(x => x.id === "974528030133334046");
   if (message.author.bot) return;

   //create user's profile with bot
   let userDetails = await usersProfile.findOne({ userID: message.author.id })
   //if user found
   if (!userDetails) {
      userDetails = await new usersProfile({
         _id: mongooseDataPack.Types.ObjectId(),
         wallet: 0,
         bank: 0
      });
      await userDetails.save()
         .catch(err => console.log(err))
   }



   //add xps to user  in database
   const randomXP = Math.floor(Math.random() * 20) + 15;
   const hasLeveledUP = await Levels.appendXp(message.author.id, "10000", randomXP);
   if (hasLeveledUP) {
      //role award with levels
      const user = await Levels.fetch(message.author.id, "10000");
      let titleMessage = `${message.author.tag} has leveled up to Level ${user.level}!`;
      let levelupEmbed = new Discord.MessageEmbed()
         .setThumbnail(message.author.displayAvatarURL({ size: 32 }))
         .setTitle(titleMessage)
         //974528030133334046
         levelUpLogOfNetflix.send({ embeds: [levelupEmbed] });
   }


   if (!message.content.startsWith(prefix1) && !message.content.startsWith(prefix2)) return;

   const args = message.content.slice(prefix1.length).trim().split(/ +/);
   const commandName = args.shift().toLowerCase();

   const command = bot.commands.get(commandName)
      || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
   if (!command) return;

   // public bot commands channel - 
   if (message.channel.name !== 'bots') {
      let botChannel = message.guild.channels.cache.find(x => x.name === "bots");
      let tempDesc = `Governor please go to <#${botChannel}> channel to run the commands.`;
      if (!botChannel) {
         tempDesc = `Governor please go to #bots channel to run the commands.`;
      }
      let incorrectChannelEmbed = new Discord.MessageEmbed()
         .setColor("#fefeff")
         .setDescription(tempDesc)
      return message.channel.send({ embeds: [incorrectChannelEmbed] });
   }

   //cooldown starts here
   if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
   }
   const now = Date.now();
   const timestamps = cooldowns.get(command.name);
   const cooldownAmount = (command.cooldown || 3) * 1000;
   let uName = message.author.tag;
   let tIcon = message.author.displayAvatarURL();
   const cooldownEmbed = new Discord.MessageEmbed()
      .setColor("#fefeff")
      .setAuthor(uName, `${tIcon}`)

   if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < expirationTime) {
         const timeLeft = (expirationTime - now) / 1000;
         var seconds = timeLeft
         const hoursLeft = Math.floor(seconds / 3600);
         seconds %= 3600;
         minutesLeft = Math.floor(seconds / 60);
         secondsLeft = seconds % 60;
         if ((hoursLeft > 0) && (minutesLeft > 0) && (secondsLeft > 0)) {
            cooldownEmbed.setDescription(`⏳ You cannot use \`${command.name}\` for ${hoursLeft.toFixed(0)} hours , ${minutesLeft.toFixed(0)} minutes and ${secondsLeft.toFixed(0)} seconds`);
         }
         if (!minutesLeft) { cooldownEmbed.setDescription(`⏳ You cannot use \`${command.name}\` for ${secondsLeft.toFixed(0)} seconds`); }
         else if (!hoursLeft) { cooldownEmbed.setDescription(`⏳ You cannot use \`${command.name}\` for ${minutesLeft.toFixed(0)} minutes and ${secondsLeft.toFixed(0)} seconds`); }
         return message.channel.send({ embeds: [cooldownEmbed] })
            .then(value => {
               setTimeout(function () {
                  value.delete();
               }, 5000)
            });
      }
   }
   timestamps.set(message.author.id, now);
   setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
   //cooldown ends here

   //usage starts here
   const usageEmbed = new Discord.MessageEmbed()
      .setAuthor(uName, `${tIcon}`)
      .setColor("#fefeff")

   if (command.guildOnly && message.channel.type === 'dm') {
      return message.reply(`I can\'t execute ${command.name} command inside DMs!`);
   }

   if (command.args && !args.length) {
      let reply = `Too few arguments given.`;
      if (command.usage) {
         reply += `\n\nUsage:\n \`${prefix1}${command.name} ${command.usage}\``;
         usageEmbed.setDescription(reply);
         return message.channel.send({ embeds: [usageEmbed] });
      }
   }
   try {
      command.execute(bot, message, args);
   }
   catch (error) {
      console.error(error);
      let botChannel = message.guild.channels.cache.find(x => x.id === logChannel);
      botChannel.send(error);
      message.reply("Issue executing that command!\n Let Uta know bout this error.")
   }
});


bot.login(process.env.token);






