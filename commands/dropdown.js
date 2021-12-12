const Discord = require("discord.js")
const prefix = require("../config.json")
const mgePoints = require("../functions/mgepoints")
const mgePointsReverse = require("../functions/mgepointsReverse")
const mgeKillingPoints = require("../functions/mgekilling")
const mgeKillingPointsReverse = require("../functions/mgekillingReverse")
const millifyPackage = require("millify")
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = {
  name: 'calc',
  desciption: 'help command',
  guildOnly: true,
  usage: '<no args>',
  cooldown: 2,
  args: false,
  async execute(bot, message, args) {


    if (message.channel.id !== "919538651195666472" && message.channel.id !== "917158209305858058") {
      let messageSent = await message.channel.send("Please go to <#919538651195666472> to run this command.");
      setTimeout(function () {
        messageSent.delete(1000);
        return;
      }, 5000)
    } else {



      const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Choose a calculator')
            .addOptions([
              {
                label: 'MGE TRAINING',
                description: 'Calculates mge training points',
                value: 'first_option',
              },
              {
                label: 'MGE TRAINING REVERSE',
                description: 'Figure out how many troops you need to train',
                value: 'first_option_reverse',
              },
              {
                label: 'MGE KILL ENEMIES',
                description: 'Calculates points from kill enemies stage',
                value: 'second_option',
              },
              {
                label: 'MGE KIL ENEMIES REVERSE',
                description: 'Figure out how many troops you need to kill',
                value: 'second_option_reverse',
              }
            ]),
        );

      const filter = (interaction) => interaction.isSelectMenu();

      const collector = message.channel.createMessageComponentCollector({ filter });

      collector.on("collect", async (collected) => {
        const value = collected.values[0];
        let secondaryEmbed = new Discord.MessageEmbed()
          .setColor("YELLOW")
        let finalEmbed = new Discord.MessageEmbed()
          .setColor("GREEN")

        if (value == "first_option") {

          secondaryEmbed.setTitle("MGE TRAINING")
          secondaryEmbed.setDescription("Enter the \*\*Tier(t1 to t5)\*\* and \*\*Amount\*\* of troops you want to train.\n" +
            "For example : \`T4 20000\`\n" +
            "OR \`t5 100000\`")
        } else if (value == "first_option_reverse") {

          secondaryEmbed.setTitle("MGE TRAINING REVERSE")
          secondaryEmbed.setDescription("Enter the \*\*Number of Points\*\* you need.\n" +
            "For example : \`2000000\`\n" +
            "OR \`5000000\`")
        }
        else if (value == "second_option") {

          secondaryEmbed.setTitle("MGE KILL ENEMIES")
          secondaryEmbed.setDescription("Enter the \*\*Tier(t1 to t5)\*\* and \*\*Amount\*\* of troops you want to kill.\n" +
            "For example : \`T4 20000\`\n" +
            "OR \`t5 100000\`")
        } else if (value == "second_option_reverse") {

          secondaryEmbed.setTitle("MGE KILL ENEMIES REVERSE")
          secondaryEmbed.setDescription("Enter the \*\*Number of Points\*\* you need.\n" +
            "For example : \`2000000\`\n" +
            "OR \`5000000\`")
        }


        //takin input from user
        const filter2 = b => b.author.id === collected.user.id;
        console.log(collected.user.id)
        message.channel.awaitMessages({ filter: filter2, max: 1, time: 300000 })
          .then(async value2 => {
            let check2 = value2.first().content;
            let contentArray = [];
            if (check2.includes(",")) {
              contentArray = check2.split(',');
            } else if (check2.includes(" ")) {
              contentArray = check2.split(' ');
            }



            if (value === "first_option") {

              if (contentArray.length < 2) return message.channel.send("Please mention all arguments.")
              let tier = contentArray[0].toLowerCase();
              var amount = parseInt(contentArray[1], 10);
              if (!Number.isInteger(amount)) return message.channel.send("Please mention numerical amount.");

              let points = await mgePoints.calculateMGEPoints(tier, amount);
              finalEmbed.setTitle("MGE TROOPS TRAINING POINTS")
              finalEmbed.setDescription(`\*\*Tier :\*\* \`${tier.toUpperCase()}\`\n` +
                `\*\*Number of troops :\*\* \`${millifyPackage.millify(amount)}\`\n\n` +
                `\*\*Total Points Gained:\*\* \`${millifyPackage.millify(points)}\``);
              message.channel.send({ embeds: [finalEmbed] })

            } else if (value === "first_option_reverse") {

              if (!check2) return message.channel.send("Please mention all arguments.")

              var amount = parseInt(check2, 10);
              if (!Number.isInteger(amount)) return message.channel.send("Please mention numerical number of troops.");

              let points = [];
              points = await mgePointsReverse.calculateMGEPointsReverse(amount);
              console.log(points);
              finalEmbed.setTitle("MGE TROOPS TRAINING REVERSE")
              finalEmbed.setDescription("You will need to train \*\*any one\*\* of these number of troops.\n" +
                `\`\`\`\n T1 :   ${millifyPackage.millify(points[0])} \n` +
                ` T2 :   ${millifyPackage.millify(points[1])} \n` +
                ` T3 :   ${millifyPackage.millify(points[2])} \n` +
                ` T4 :   ${millifyPackage.millify(points[3])} \n` +
                ` T5 :   ${millifyPackage.millify(points[4])} \n\`\`\``);
              message.channel.send({ embeds: [finalEmbed] })

            } else if (value === "second_option") {

              if (contentArray.length < 2) {
                return message.channel.send("Please mention all arguments.")
              }

              let tier = contentArray[0].toLowerCase();
              var amount = parseInt(contentArray[1], 10);
              if (!Number.isInteger(amount)) return message.channel.send("Please mention numerical amount.");

              let points = await mgeKillingPoints.calculateMGEKilling(tier, amount);
              finalEmbed.setTitle("MGE KILL ENEMIES POINTS")
              finalEmbed.setDescription(`\*\*Tier :\*\* \`${tier.toUpperCase()}\`\n` +
                `\*\*Number of troops :\*\* \`${millifyPackage.millify(amount)}\`\n\n` +
                `\*\*Total Points Gained:\*\* \`${millifyPackage.millify(points)}\``);
              message.channel.send({ embeds: [finalEmbed] })

            } else if (value === "second_option_reverse") {

              if (!check2) return message.channel.send("Please mention all arguments.")

              var amount = parseInt(check2, 10);
              if (!Number.isInteger(amount)) return message.channel.send("Please mention numerical number of troops.");

              let points = [];
              points = await mgeKillingPointsReverse.calculateMGEKillingReverse(amount);
              console.log(points);
              finalEmbed.setTitle("MGE KILL ENEMY REVERSE")
              finalEmbed.setDescription("You will need to kill \*\*any one\*\* of these number of enemies.\n" +
                `\`\`\`\n T1 :   ${millifyPackage.millify(points[0])} \n` +
                ` T2 :   ${millifyPackage.millify(points[1])} \n` +
                ` T3 :   ${millifyPackage.millify(points[2])} \n` +
                ` T4 :   ${millifyPackage.millify(points[3])} \n` +
                ` T5 :   ${millifyPackage.millify(points[4])} \n\`\`\``);
              message.channel.send({ embeds: [finalEmbed] })

            }



          }).catch(err => {
            console.log(err + "Incorrect Syntax");
          })

        await collected.deferUpdate();
        collected.channel.send({ embeds: [secondaryEmbed], ephemeral: true });
      })
      await message.channel.send({ content: "Calculator :", components: [row] });

    }
  },
};