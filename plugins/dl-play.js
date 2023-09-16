
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
┏─── 〔 Y O U T U B E 〕 ─⦁
┌──────────────
⦁ 📌 *Tile* : ${title}
⦁ 📆 *Relise:* ${ago}
⦁ ⌚ *duration:* ${timestamp}
⦁ 👀 *views:* ${views}
└──────────────⦁⦁`
 await conn.sendButton(m.chat,`┏─── 〔 Y O U T U B E 〕 ─⦁
┌──────────────
⦁ 📌 *Tile* : ${title}
⦁ 📆 *Relise:* ${ago}
⦁ ⌚ *duration:* ${timestamp}
⦁ 👀 *views:* ${views}
└──────────────⦁⦁`, author.trim(), await( await conn.getFile(thumbnail)).data, ['📽VIDEO', `${usedPrefix}getvid ${url} 360`], false, { quoted: m, 'Video': { 'url':'https://wa.me/+94770378874' },
'mimetype': global.dpdf,
'fileName': `YouTube Play`,
'fileLength': 666666666666666,
'pageCount': 666,contextInfo: { externalAdReply: { showAdAttribution: true,
mediaType:  2,
mediaUrl: `${url}`,
title: `AUDIO SENDING...`,
body: wm,
sourceUrl: 'http://wa.me/+94770378874', thumbnail: await ( await conn.getFile(thumbnail)).data
  }
 } 
})
handler.help = ['Song']
handler.tags = ['dl']
handler.command = ['play', 'Song']
handler.disabled = true

export default handler
