let limit = 80
let fetch = require('node-fetch')
const { youtubeSearch, youtubedl, youtubedlv2, youtubedlv3 } = require('@bochilteam/scraper')
let handler = async (m, { conn, args, isPrems, isOwner }) => {
  if (!args || !args[0]) throw 'Enter the link'
  let chat = global.db.data.chats[m.chat]
  const isY = /y(es)/gi.test(args[1])
  const { thumbnail, video: _video, title} = await youtubedlv2(args[0]).catch(async _ => await youtubedl(args[0])).catch(async _ => await youtubedlv3(args[0]))
  const limitedSize = (isPrems || isOwner ? 99 : limit) * 1024
  let video, source, res, link, lastError, isLimit
  for (let i in _video) {
    try {
      video = _video[i]
      isLimit = limitedSize < video.fileSize
      if (isLimit) continue
      link = await video.download()
      if (link) res = await fetch(link)
      isLimit = res?.headers.get('content-length') && parseInt(res.headers.get('content-length')) < limitedSize
      if (isLimit) continue
      if (res) source = await res.arrayBuffer()
      if (source instanceof ArrayBuffer) break
    } catch (e) {
      video = source = link = null
      lastError = e
    }
  }
  if ((!(source instanceof ArrayBuffer) || !link || !res.ok) && !isLimit) throw 'Error: ' + (lastError || 'Can\'t download video')
  if (!isY && !isLimit) await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', `
┏┉┉┉┉❬ *YOUTUBE* ❭┉┉┉┉┉⦁
┗⚋⚋⚋⚋⚋⚋⚋⦁
⦁⦁☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷⦁⦁
⦁📝 *Title:* ${title}
⦁🌿 *Quality:* 360p
⦁⚖️ *Filesize:* ${video.fileSizeH}
ʙʏ Qᴜᴇᴇɴ-ꜱᴀᴋᴜʀᴀ-ᴍᴅ©
⦁⦁☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷⦁⦁
`.trim(), m)
  let _thumb = {}
  try { _thumb = { thumbnail: await (await fetch(thumbnail)).buffer() } }
  catch (e) { }
  if (!isLimit) await conn.sendFile(m.chat, link, title + '.mp4', `
┏┉┉┉❬ *YOUTUBE* ❭┉┉┉┉⦁
┗⚋⚋⚋⚋⚋⚋⦁⦁⦁
⦁⦁☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷⦁⦁
⦁ *📝ᴛɪᴛʟᴇ:* ${title}
⦁ *🌿ᴛʏᴘᴇ:* ᴍᴘ3/ᴀᴜᴅɪᴏ
⦁ *⚖️ꜰɪʟᴇꜱɪᴢᴇ:* ${audio.fileSizeH}

*⏳L O A D I N G. . .*
ʙʏ Qᴜᴇᴇɴ-ꜱᴀᴋᴜʀᴀ-ᴍᴅ ©
⦁⦁☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷⦁⦁
`.trim(), m, false, {
    ..._thumb,
    asDocument: chat.useDocument
  })
}
handler.help = ['video', 'v', ''].map(v => 'yt' + v + ` <url> <without message>`)
handler.tags = ['downloader', 'limitmenu']
handler.command = /^yt(v|mp4)?$/i

handler.exp = 0
handler.register = false
handler.limit = true


module.exports = handler
