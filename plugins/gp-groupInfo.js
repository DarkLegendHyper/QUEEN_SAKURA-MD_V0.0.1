//import db from '../lib/database.js'

let handler = async (m, { conn, participants, groupMetadata }) => {
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png'
    const { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, delete: del } = global.db.data.chats[m.chat]
    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
    let text = `
┌⚋⚋⚋「 *GROUP-INFORM* 」⚋⚋⚋⦁❉⦁
┗⚋⚋⚋⚋⚋⚋⚋⚋⦁❉⦁
⦁⦁⚋⚋❲ *𝑄𝑈𝛯𝛯𝛮-𝑆𝛥𝛫𝑈𝑅𝛥_𝛭𝐷* ❳⚋⚋⦁❉⦁
❉⚋⚋⚋❲👩‍💻 *🔖GROUP-ID:* ❳⚋⚋⚋⦁⦁
•❉➠ ${groupMetadata.id}
   
❉⚋⚋⚋❲🍃 *🏷️NUMBER* ❳⚋⚋⚋⦁⦁
•❉➠ ${groupMetadata.subject}

❉⚋⚋⚋❲🪀 *👥MEMBERS* ❳⚋⚋⚋⦁⦁
•❉➠ ${participants.length}

❉⚋⚋❲🔱 *🤿Owner the group:* ❳⚋⚋⦁⦁
•❉➠ @${owner.split('@')[0]}

❉⚋⚋⚋❲👸 *🕵🏻‍♂️Admins:* ❳⚋⚋⚋⦁⦁
⦁❉➠ ${listAdmin}

❉⦁⦁⦁⦁⦁⦁⦁❲ *🔖 group configuration:* ❳⦁⦁⦁⦁⦁⦁⦁❉
🔱 ${isBanned ? '✅' : '❎'} *Banned*
🔱 ${welcome ? '✅' : '❎'} *Welcome*
🔱 ${detect ? '✅' : '❎'} *Detector*
🔱 ${del ? '❎' : '✅'} *Anti Delete*
🔱 ${antiLink ? '✅' : '❎'} *Anti Link WhatsApp*

❉⦁⦁⦁⦁⦁❲ *🔖 message settings:* ❳⦁⦁⦁⦁⦁❉
🎀 Welcome: ${sWelcome}
🎀  Farewell:group configuration ${sBye}
🎀 Promoted: ${sPromote}
🎀 Demote: ${sDemote}

❉⦁⦁⦁⦁⦁❲ *🔱Descripción* ❳⦁⦁⦁⦁⦁❉
   🧬 ${groupMetadata.desc?.toString() || 'a stranger'}
`.trim()
    conn.sendFile(m.chat, pp, 'pp.jpg', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
}

handler.help = ['infogp']
handler.tags = ['group']
handler.command = ['infogrupo', 'groupinfo', 'inform'] 
handler.group = true

export default handler
