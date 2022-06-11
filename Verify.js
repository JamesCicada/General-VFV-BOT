const { MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
    callback: async ({ interaction: msgInt, channel }) => {
      const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setCustomId('verify')
        .setEmoji('✅')
        .setLabel('Verify')
        .setStyle('SUCCESS')
      )
      await msgInt.reply({
        content: 'Get Verified?',
        component: [row],
      })










        /*message.channel.send({  "embeds": [
            {
              "type": "rich",
              "title": `Verification`,
              "description": "",
              "color": 0x00ff04,
              "fields": [
                {
                  "name": `React to this message to get verified`,
                  "value": "\u200B"
                }
              ],
              "author": {
                "name": `V FOR VENDETTA`
              },
              "footer": {
                "text": `VFV`,
                "icon_url": `https://cdn.discordapp.com/icons/825526271311478824/a_cf99a6c571cb6d8be0ca8b2727be3ed7.gif?size=1024`
              }
            }
          ]}).then(function (message) {
            message.react("✅")
          })*/
    },
}