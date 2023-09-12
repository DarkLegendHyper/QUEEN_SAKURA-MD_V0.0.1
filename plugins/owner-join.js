
let handler = async (m, { conn, text, usedPrefix, command, args, participants, isOwner }) => {
	
   if (!isOwner) return conn.reply(m.chat, `*Invitar bot a un grupo*\n\nHola @${m.sender.split('@')[0]}\npuedes alquilar el bot para que se una a un grupo`.trim(), m, { mentions: [m.sender] })
	
  let time = global.db.data.users[m.sender].lastjoin + 86400000
  let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
  let delay = time => new Promise(res => setTimeout(res, time))
 
  let name = m.sender 
  let [_, code] = text.match(linkRegex) || []
  if (!args[0]) throw `🔱 please Enter the group Link\n\n ⚡ Example:\n *${usedPrefix + command}* <linkwa> <dias>\n\n https://chat.whatsapp.com/FYPYqeucaxr4qwME8G6Tot` 
  if (!code) throw `✳️ Link inválido`
  if (!args[1]) throw `🔱 please Type To \n\n Example \n *${usedPrefix + command}* <linkwa> 2`
  if (isNaN(args[1])) throw `❌ Cant join.....`
  let owbot = global.owner[1] 
  m.reply(`😎3 ALL GROUP LIMIT `)
  await delay(3000)
  try {
  let res = await conn.groupAcceptInvite(code)
  let b = await conn.groupMetadata(res)
  let d = b.participants.map(v => v.id)
  let member = d.toString()
  let e = await d.filter(v => v.endsWith(owbot + '@s.whatsapp.net'))
  let nDays = 86400000 * args[1]  
  let now = new Date() * 1
  if (now < global.db.data.chats[res].expired) global.db.data.chats[res].expired += nDays
  else global.db.data.chats[res].expired = now + nDays
  if (e.length) await m.reply(`✅ Group \n\n❉ Info delete group \n\n *Numbre :* ${await conn.getName(res)}\n\nAuto whatsapp bot  \n\n${msToDate(global.db.data.chats[res].expired - now)}`)
 
 if (e.length) await conn.reply(res, `🤜 Hello 

@${owbot} Contract owner 
fui invitado por *${m.name}*`, m, {
    mentions: d
     }).then(async () => {
     await delay(7000)
     }).then( async () => {
     await conn.reply(res, `😂.....🤭`, 0)
     await conn.reply(global.owner[1]+'@s.whatsapp.net', `⦁❉⦁ *INVITE  A GRUPO*\n\n@${m.sender.split('@')[0]} INVITED BY *${conn.user.name}* a group\n\n*${await conn.getName(res)}*\n\n*ID* : ${res}\n\n🔱: ${args[0]}\n\n Auto whatsapp bot \n\n${msToDate(global.db.data.chats[res].expired - now)}`, null, {mentions: [m.sender]})
     })
     if (!e.length) await conn.reply(global.owner[1]+'@s.whatsapp.net', `⦁❉⦁ *INVITED  A GRUPO*\n\n@${m.sender.split('@')[0]} Invited by*${conn.user.name}* a Group \n\n*${await conn.getName(res)}*\n\n*ID* : ${res}\n\n🔱 : ${args[0]}\n\nAuto whatsapp bot \n\n ${msToDate(global.db.data.chats[res].expired - now)}`, null, {mentions: [m.sender]})
     if (!e.length) await m.reply(`❌\n\n${await conn.getName(res)}\n\n Auto whatsapp bot  *${msToDate(global.db.data.chats[res].expired - now)}*`).then(async () => {
     let mes = `Hello  👋🏻
     
*${conn.user.name}* bot multidevice WhatsApp bot control by Node.js, *${conn.user.name}* invited by *${m.name}*

para ver el Menu del bot escribe

${usedPrefix}help
@${conn.user.jid.split('@')[0]} Auto whatsapp bot  \n\n${msToDate(global.db.data.chats[res].expired - now)}`
  await conn.reply(res, mes, m, {
        mentions: d
         })
     })
    } catch (e) {
      conn.reply(global.owner[1]+'@s.whatsapp.net', e)
      throw `❌ not logged`
      }
}
handler.help = ['join <chat.whatsapp.com> <dias>']
handler.tags = ['owner']
handler.command = ['join', 'invite'] 

//handler.owner = true

export default handler

function msToDate(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, ' *Días*\n ', h, ' *Horas*\n ', m, ' *Minutos*\n ', s, ' *Segundos* '].map(v => v.toString().padStart(2, 0)).join('')
}
