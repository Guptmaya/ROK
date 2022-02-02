const Discord = require("discord.js")
const eventsInfo = require("../json/events.json")

const paginator = async (whichi,msg, pages) => {

   let eventImage = eventsInfo.events[whichi].image;
   let page = 0;
   const btn1 = new Discord.MessageButton()
      .setEmoji('⬅️')
      .setCustomId("00001101001110")
      .setStyle("SECONDARY")

   const btn2 = new Discord.MessageButton()
      .setEmoji('➡️')
      .setCustomId("00101101001110")
      .setStyle("SECONDARY")

   const row = new Discord.MessageActionRow()
      .addComponents([btn1, btn2])

   const btn1After = new Discord.MessageButton()
      .setEmoji('⬅️')
      .setCustomId("00101101101110")
      .setStyle("SECONDARY")
      .setDisabled()

   const btn2After = new Discord.MessageButton()
      .setEmoji('➡️')
      .setCustomId("00101101011110")
      .setStyle("SECONDARY")
      .setDisabled()

   const deadRow = new Discord.MessageActionRow().addComponents([btn1After, btn2After])

   let imageNameFormat = `./images/${eventImage}`
   let file = new Discord.MessageAttachment(imageNameFormat);
   let cardImage1 = `attachment://${eventImage}`;

   const curPage = await msg.channel.send({ embeds: [pages[0]], components: [row], files: [file] })
   const filter = (b) => ['00001101001110', '00101101001110'].includes(b.customId) && b.user.id === msg.author.id;
   const col = await curPage.channel.createMessageComponentCollector({ filter, time: 120000 });

   col.on('collect', async button => {
      console.log("collecting ?");
      await button.deferUpdate();

      if (button.customId == '00001101001110') {
         page = page > 0 ? --page : pages.length - 1
      }

      else if (button.customId == '00101101001110') {
         page = page + 1 < pages.length ? ++page : 0;
      }

      await curPage.edit({ embeds: [pages[page]], components: [row], files: [file]  })
   })

   col.on('end', async () => {
      if (!curPage.deleted) {
         await curPage.edit({ embeds: [pages[page]], components: [deadRow], files: [file]  })
      }
   })

   return curPage
}

module.exports = paginator