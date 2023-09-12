
import yts from 'yt-search'

let handler = async (m, {conn, text }) => {
  if (!text) throw '✳️ Que quieres que busque en YouTube?'
  let results = await yts(text)
  let tes = results.all
  let teks = results.all.map(v => {
    switch (v.type) {
      case 'video': return `
⦁⦁⚋⚋⚋⚋❲ *QUEEN-SAKURA* ❳⚋⚋⦁⦁      
⦁ ${v.title}
⦁ *Link* : ${v.url}
⦁ *Duration* : ${v.timestamp}
⦁ *Uploaded* : ${v.ago}
⦁ *Views* : ${v.views}

   `.trim()
      case 'canal': return `
⦁ *${v.name}* (${v.url})
⦁${v.subCountLabel} (${v.subCount}) Suscribirse
⦁ ${v.videoCount} videos
`.trim()
    }
  }).filter(v => v).join('\n\n⚋⚋⚋⚋⚋⚋⚋⚋⚋⚋⚋⚋⚋⚋⦁⦁⦁\n\n')
  conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, m)
}
handler.help = ['ytsearch'] 
handler.tags = ['dl']
handler.command = ['ytsearch', 'yts'] 

export default handler
