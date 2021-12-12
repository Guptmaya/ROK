const Discord = require("discord.js");
const fs = require('fs');
const logChannel = '917158209305858058';
const { Client, Intents } = require('discord.js');
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

bot.on("ready", async () => {
   console.log('ready');
});


for (const files of commandFiles) {
   const command = require(`./commands/${files}`);
   bot.commands.set(command.name, command);
}

//welcome

bot.on("guildMemberAdd", async (message, member) => {
   let botChannel = message.guild.channels.cache.find(x => x.id === logChannel);
   let welcome = message.guild.channels.cache.find(x => x.id === "710978238200938511");
   let WelcomeEmbed = new Discord.MessageEmbed()
   let M = `\*\*Welcome Governor <@${message.user.id}>\*\*` +
      `\n\n Please wait for an Administrator to give you a role to access the server.\n` +
      `\nMeanwhile run the command \`r!update-name [Your ROK name]\` to update your name, it makes easier for everyone to identify you. \n`;
   WelcomeEmbed.setDescription(M)
   WelcomeEmbed.setColor("RED")
   WelcomeEmbed.setFooter("Please contact an Admin if you have any questions.");
   welcome.send({ embeds: [WelcomeEmbed] });
   botChannel.send(`<@${message.user.id}> joined the server.`);
});

bot.on("guildMemberRemove", async (message, member) => {
   let botChannel = message.guild.channels.cache.find(x => x.id === logChannel);
   botChannel.send(`<@${message.user.id}> left the server.`);
});



//for commands
bot.on("messageCreate", async message => {
   //if (message.author.id != "541467870819778562" && message.author.id != "853280361521086476") return;
   let prefix1 = config.prefix1;
   let prefix2 = config.prefix2;

   if (message.author.bot) return;

   if (!message.content.startsWith(prefix1) && !message.content.startsWith(prefix2)) return;

   const args = message.content.slice(prefix1.length).trim().split(/ +/);
   const commandName = args.shift().toLowerCase();

   const command = bot.commands.get(commandName)
      || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
   if (!command) return;

   //test and log channel - 917158209305858058
   // public bot commands channel - 
  /* if (message.channel.id !== '917158209305858058' && message.channel.id !== '919538651195666472') {
      if (command.validChannels && (message.channel.name !== command.validChannels)) {
         let botChannel = message.guild.channels.cache.find(x => x.id === "919538651195666472");
         let incorrectChannelEmbed = new Discord.MessageEmbed()
            .setColor("#fefeff")
            .setDescription(`🕵️ Incorrect Channel.\n Head over to <#${botChannel}>`)
         return message.channel.send({ embeds: [incorrectChannelEmbed] });
      }
   }
   */


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
      let botChannelLogs = message.guild.channels.cache.find(x => x.id === logChannel);
      botChannelLogs.send(error);
      message.reply("Issue executing that command!\n Let Devs know bout this error.")
   }
});





bot.login(process.env.token);






