let handler = async (m, { conn, text, participants, isAdmin, isOwner, groupMetadata }) => {
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    m.reply(`🎀 *GROUP* : *${groupMetadata.subject}*\n🔱 *Members* : *${participants.length}*${text ? `\n🔖 Massage : ${text}\n` : ''}\n┌⚋⚋⚋❉⦁❲ *TAG BY 𝑄𝑈𝛯𝛯𝛮-𝑆𝛥𝛫𝑈𝑅𝛥_𝛭𝐷*\n` + users.map(v => '*❲⦁❳* 🏷️ @' + v.replace(/@.+/, '')).join`\n` + '\n└⚋⚋⚋⦁❉👸 *QUEEN-SAKURA*', null, {
        mentions: users
    })
}

handler.help = ['tagall']
handler.tags = ['group']
handler.command = ['tagall']
handler.admin = true
handler.group = true

export default handler
