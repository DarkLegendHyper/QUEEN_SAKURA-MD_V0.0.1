
let handler = async (m, { conn, text, usedPrefix, command }) => {

    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
     if (!teks) throw `📝 Example : *${usedPrefix + command}* Queen-Sakura`
      m.react(rwait)
      let img = global.API('fgmods', '/api/maker/txt', { text: teks }, 'apikey')
      conn.sendFile(m.chat, img, 'img.png', `⚡ Please Enter the Text ✍🏻`, m)
      m.react(done)

  }
  handler.help = ['txt']
  handler.tags = ['fun']
  handler.command = ['txt']
  
  export default handler
  
