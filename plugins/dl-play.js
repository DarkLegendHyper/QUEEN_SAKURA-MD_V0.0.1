
import yts from 'yt-search'
let handler = async (m, { conn, command, text, usedPrefix }) => {
	
	if (!text) throw `🔖 Enter a song title\n\n📌 Example *${usedPrefix + command}* *Dont go baby dont go*`
	let res = await yts(text)
	let vid = res.videos[0]
	if (!vid) throw `💥 Vídeo/Audio no found`
	let { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid
	//const url = 'https://www.youtube.com/watch?v=' + videoId
	m.react('🎧')
	let play = `
  乂  *ＳＡＫＵＲＡ-ＹＴＤＬ*
☵☵☵☵☵☵☵☵☵☵☵☵☵☵☵☵☵☵☵☵☵
▢📌 *ＶＩＤＥＯ-ＴＩＬＥ*
 ➦⦁: ${title}
▢📆 *ＶＩＤＥＯ-ＲＥＬＩＳＥ* 
 ➦⦁: ${ago}
▢⌚ *ＴＩＭＥ-ＤＵＲＡＴＩＯＮ*
 ➦⦁: ${timestamp}
▢👀 *ＶＩＤＥＯ-ＶＩＥＷＳ* 
 ➦⦁: ${views}
⦁⦁❬©ＵＰＬＯＡＤＥＤ ＢＹ ＳＡＫＵＲＡ❭⦁⦁
☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷`
 await conn.sendButton(m.chat, play, fgig, thumbnail, [
    ['🎶 MP3', `${usedPrefix}ytmp3 ${url}`],
    ['🎥 MP4', `${usedPrefix}ytmp4 ${url}`]
  ], m, rpl)
}
handler.help = ['play']
handler.tags = ['dl']
handler.command = ['play', 'song']
handler.disabled = true

export default handler
