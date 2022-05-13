const Discord = require("discord.js")
const paginator = async (msg, pages) => {
   let page = 0;
   console.log(pages[pages.length])
   const btn1 = new Discord.MessageButton()
      .setLabel('Previous')
      .setCustomId("00000000000001")
      .setStyle("SECONDARY")

   const btn2 = new Discord.MessageButton()
      .setLabel('Next')
      .setCustomId("00000000000010")
      .setStyle("SECONDARY")

   const row = new Discord.MessageActionRow().addComponents([btn1, btn2])

   const btn1After = new Discord.MessageButton()
      .setLabel('Previous')
      .setCustomId("00000000000001")
      .setStyle("SECONDARY")
      .setDisabled()

   const btn2After = new Discord.MessageButton()
      .setLabel('Next')
      .setCustomId("00000000000010")
      .setStyle("SECONDARY")
      .setDisabled()


   const deadRow = new Discord.MessageActionRow().addComponents([btn1After, btn2After])


   const curPage = await msg.channel.send({ embeds: [pages[0]], components: [row] })
   const filter = (b) => ['00000000000001', '00000000000010'].includes(b.customId) && b.user.id === msg.author.id;
   const col = await curPage.channel.createMessageComponentCollector({ filter, time: 60000 });

   col.on('collect', async button => {
      console.log("collecting ?");
      await button.deferUpdate();

      if (button.customId == '00000000000001') {
         page = page > 0 ? --page : pages.length - 1
      }

      else if (button.customId == '00000000000010') {
         page = page + 1 < pages.length ? ++page : 0;
      }
      await curPage.edit({ embeds: [pages[page]], components: [row] })
   })

   col.on('end', async () => {
      if (!curPage.deleted) {
         await curPage.edit({ embeds: [pages[page]], components: [deadRow] })
      }
   })

   return curPage
}

module.exports = paginator