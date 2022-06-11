const punish = require('../models/punishment-schema')



module.exports = (client) => {
    client.on('guildMemberAdd', async (member) => {
        const result = await punish.findOne({
            guildId: member.guild.id,
            userId: member.id,
            type: 'mute',
        })

        if (result) {
            const muteRole = member.guild.roles.cache.find(
                (role) => role.name === 'Muted'
            )
            if (mutedRole) {
                member.roles.add(mutedRole)
            }
        }
    })
    const check = async () => {
        const query = {
            expires: { $lt: new Date() },
        }
        const result = await punish.find(query)

        for (const result of results) {
            const { guildId, userId, type } = result
            const guild = await client.guilds.fetch(guildId)
            if (!guild) {
                console.log(`Guild "${guildId}" no lonegr uses this bot.`)
                continue
            }

            if (type === 'ban') {
                guild.members.unban(userId, "Ban Expired")
            } else if (type === 'mute') {
                const muteRole = guild.roles.cache.find((role) => role.name === 'Muted')
                if (!muteRole) {
                    console.log(`Guild "${guildId}" has no "Muted" role.`)
                    continue
                }
                
                const member = guild.members.cache.get(userId)
                if (!member) {
                    continue
                }
                member.roles.remove(muteRole)
            }
        }
        await punish.deletMany(query)
        
        setTimeout(check, 1000 * 60)
    }
    check()
}