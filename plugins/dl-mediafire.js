
import fetch from 'node-fetch'
import { mediafiredl } from '@bochilteam/scraper'
import fg from 'api-dylux'
let free = 150 // limite de descarga
let prem = 300 //si su servidor tienes menos de 2GB baja el límite
let handler = async (m, { conn, args, text, usedPrefix, command, isOwner, isPrems }) => {
	
   if (!args[0]) throw `⚡ Please Enter the  mediafire Link`
    if (!args[0].match(/mediafire/gi)) throw `❎ Link Erorr..`
    m.react(rwait)
    
    let limit = isPrems || isOwner ? prem : free
	let u = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0]
    let ss = await (await fetch(global.API('nrtm', '/api/ssweb', { delay: 1000, url: u }))).buffer()
    try {
    let res = await mediafiredl(args[0])
    let { url, url2, filename, ext, aploud, filesize, filesizeH } = res
    let isLimit = limit * 1024 < filesize
    let caption = `
    ⦁⦁⦁●●❉❲ *MEDIAFIRE* ❳❉●●⦁⦁⦁
❉●⦁ *📝File name:* ${filename}
❉●⦁ *⚖️File Size:* ${filesizeH}
❉●⦁ *⚡Inform:* ${ext}
❉●⦁ *📩Upload:* ${aploud}
${isLimit ? `\n❉●⦁ Download Limit *+${free} MB*\n❉●⦁Size  *${prem} MB*` : ''} 
`.trim()
    await conn.sendFile(m.chat, ss, 'ssweb.png', caption, m)  
    if(!isLimit) await conn.sendFile(m.chat, url, filename, '', m, null, { mimetype: ext, asDocument: true })
    m.react(done)
    
    } catch {

        try {
	let res = await fg.mediafireDl(args[0])
     let { url, url2, filename, ext, upload_date, filesize, filesizeB } = res
    let isLimit = limit * 1024 < filesizeB
    let caption = `
   ⦁⦁⦁●●❉❲ *MEDIAFIRE* ❳❉●●⦁⦁⦁
❉●⦁ *📝File name:* ${filename}
❉●⦁ *⚖️File Size:* ${filesizeH}
❉●⦁ *⚡Inform:* ${ext}
❉●⦁ *📩Upload:* ${aploud}
${isLimit ? `\n❉●⦁ Download Limit *+${free} MB*\n❉●⦁Size  *${prem} MB*` : ''} 
`.trim()

await conn.sendFile(m.chat, ss, 'ssweb.png', caption, m)
if(!isLimit) await conn.sendFile(m.chat, url, filename, '', m, null, { mimetype: ext, asDocument: true })
    m.react(done)
} catch {
    m.reply(`Error: link`)
}

  }
  
}
handler.help = ['mediafire <url>']
handler.tags = ['dl', 'prem']
handler.command = ['mediafire', 'mfire'] 
handler.diamond = true
handler.premium = false

export default handler
