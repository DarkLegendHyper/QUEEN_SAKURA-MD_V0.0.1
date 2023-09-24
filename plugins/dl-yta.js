
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
  if (!args || !args[0]) throw `🌿 EXAMPLE:\n${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`
  if (!args[0].match(/youtu/gi)) throw `❎ ENTER THE VALUA YOUTUBE LINK`
   m.react(rwait)
 let chat = global.db.data.chats[m.chat]
  try {
		let q = '128kbps'
		let v = args[0]
		const yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
		const dl_url = await yt.audio[q].download()
		const title = await yt.title
		const size = await yt.audio[q].fileSizeH
		conn.sendFile(m.chat, dl_url, title + '.mp3', `
┏⦁⦁⦁⦁⦁●❉❲ *YOUTUBE* ❳❉●⦁⦁⦁⦁
┗❉●●●●⦁⦁
⦁ *📝TITLE* : ${title}
⦁ *⚖️FILESIZE* : ${size}
💃B҈Y҈ Q҈U҈E҈E҈N҈-S҈A҈K҈U҈R҈A҈..
`.trim(), m, false, { mimetype: 'audio/mpeg', asaudio: chat.useaudio })
		m.react(done)
        } catch {
			await m.reply(`❎ Error: .......`)
} 

}
handler.help = ['ytmp3 <url>']
handler.tags = ['dl']
handler.command = ['ytmp3', 'dlmp3'] 
handler.diamond = true

export default handler
