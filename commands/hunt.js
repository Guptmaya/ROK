const Discord = require("discord.js")
const whoisWinner = require("../functions/whoWon")
const UserProfile = require("../schemas/userProfile")
module.exports = {
  name: 'hunt',
  desciption: 'Calculates Action Points',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 5,
  args: false,
  async execute(bot, message, args) {
    let change = "yes";
    let firstArgument = args[0];
    if (firstArgument === "barb" || firstArgument === "barbs" || firstArgument === "barbarian" || firstArgument === "barbarians") {
      let UserProfileDetails = await UserProfile.findOne({ userID: message.author.id })
      if (!UserProfileDetails) {
        return message.channel.send("To hunt barbarians register yourself first by running \`r!register\`");
      }
      //calculate user power and choose a barb based on that
      const btn1 = new Discord.MessageButton()
        .setEmoji('⚔️')
        .setCustomId("00001101001110")
        .setStyle("SECONDARY")

      const btn2 = new Discord.MessageButton()
        .setLabel('Skip')
        .setCustomId("00101101001110")
        .setStyle("SECONDARY")

      const row = new Discord.MessageActionRow()
        .addComponents([btn1, btn2])

      const btn1After = new Discord.MessageButton()
        .setEmoji('⚔️')
        .setCustomId("00101101101110")
        .setStyle("SECONDARY")
        .setDisabled()

      const btn2After = new Discord.MessageButton()
        .setLabel('Skip')
        .setCustomId("00101101011110")
        .setStyle("SECONDARY")
        .setDisabled()

      const deadRow = new Discord.MessageActionRow().addComponents([btn1After, btn2After])

      let file = new Discord.MessageAttachment('./images/barbarian.png');
      let barbImage = `attachment://barbarian.png`;

      let embed = new Discord.MessageEmbed()
        .setTitle("Barbarians")
        .setColor("RED")
        .setDescription(`\`\`\`Barbarian Level : 1-5\n` +
          `Rewards : Gems\`\`\``)
        .setThumbnail(barbImage)
        .setFooter("Click the ⚔️ below to attack the barbarian.")

      const curPage = await message.channel.send({ embeds: [embed], components: [row], files: [file] })
      const filter = (b) => ['00001101001110', '00101101001110'].includes(b.customId) && b.user.id === message.author.id;
      const col = await curPage.channel.createMessageComponentCollector({ filter, time: 30000 });

      col.on('collect', async button => {
        console.log("collecting ?");
        await button.deferUpdate();

        if (button.customId == '00001101001110') {
          console.log("attacked.");
          let attacking = new Discord.MessageEmbed()
            .setTitle("Barbarians")
            .setColor("GREEN")
            .setThumbnail(barbImage)
            .setDescription("Attacking Barbarian...")
          await curPage.edit({ embeds: [attacking], components: [deadRow], files: [file] })

          let winner = await whoisWinner.calculateWinner(message);
          if (winner === "user") {
            change = "no";
            function getRandomArbitrary(min, max) {
              return Math.floor(Math.random() * (max - min) + min);
            }
            let numberOfGems = getRandomArbitrary(50, 100);
            let attackEmbed = new Discord.MessageEmbed()
              .setTitle("Barbarians")
              .setColor("GREEN")
              .setThumbnail(barbImage)
              .setDescription("\`\`\`Successfully hunted the barbarian.\n" +
                `Rewards : ${numberOfGems} Gems\`\`\``)
            await curPage.edit({ embeds: [attackEmbed], components: [deadRow], files: [file] })
            await UserProfile.findOneAndUpdate({ userID: message.author.id }, { barbs: UserProfileDetails.barbs + 1, gems: UserProfileDetails.gems + numberOfGems })
              .catch(err => {
                console.log(err);
              })
            col.end();
            return;
          } else if (winner === "barb") {
            change = "no";
            let attackEmbed = new Discord.MessageEmbed()
              .setTitle("Barbarians")
              .setColor("RED")
              .setThumbnail(barbImage)
              .setDescription("\`\`\`Failed to hunt the barbarian.\n" +
                `Tip : Increase your level with bot to boost your attack and health buffs.\`\`\``)
            await curPage.edit({ embeds: [attackEmbed], components: [deadRow], files: [file] })
            col.end();
            return;
          }
        }

        else if (button.customId == '00101101001110') {
          change = "no";
          let skippedEmbed = new Discord.MessageEmbed()
            .setTitle("Barbarians Skipped")
            .setColor("RED")
            .setThumbnail(barbImage)
            .setDescription("Run the \`r!hunt barb\` to find a new barbarian.")
          await curPage.edit({ embeds: [skippedEmbed], components: [deadRow], files: [file] })
          col.end();
          return;
        }

        await curPage.edit({ embeds: [embed], components: [row], files: [file] })
      })

      col.on('end', async () => {
        console.log(change);
        if (!curPage.deleted && change === "yes") {
          await curPage.edit({ embeds: [embed], components: [deadRow], files: [file] })
        }
      })

    }
    else {
      let embed = new Discord.MessageEmbed()
        .setTitle("Hunt")
        .setColor("RED")
        .setDescription("Run \`r!hunt barb\` to hunt the barbarians.")
      message.channel.send({ embeds: [embed] });
    }


  },
};