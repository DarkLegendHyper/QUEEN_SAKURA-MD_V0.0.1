
import fg from 'api-dylux'
let handler  = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!text) throw `⚡ Please Enter the Text \n\n👉 Example: *${usedPrefix + command}* *QUEEN-SAKURA*`
  let res = await fg.googleImage(text)
  conn.sendFile(m.chat, res.getRandom(), 'img.png', `
✅ *Image Name* : *${text}*\n💃BY 𝑄𝑈𝛯𝛯𝛮-𝑆𝛥𝛫𝑈𝑅𝛥_𝛭𝐷`.trim(), m)
}
handler.help = ['imagen']
handler.tags = ['img']
handler.command = /^(img|image|gimage|imagen)$/i
handler.diamond = true

export default handler
