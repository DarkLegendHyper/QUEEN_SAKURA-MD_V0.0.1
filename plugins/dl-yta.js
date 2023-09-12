let limit = 80
let fetch = require('node-fetch')
const { youtubedl, youtubedlv2, youtubedlv3 } = require('@bochilteam/scraper')
let handler = async (m, { conn, args, isPrems, isOwner }) => {
  if (!args || !args[0]) throw 'Enter the link'
  let chat = global.db.data.chats[m.chat]
  const isY = /y(es)/gi.test(args[1])
  const { thumbnail, audio: _audio, title } = await youtubedlv2(args[0]).catch(async _ => await youtubedl(args[0])).catch(async _ => await youtubedlv3(args[0]))
  const limitedSize = (isPrems || isOwner ? 99 : limit) * 1024
  let audio, source, res, link, lastError, isLimit
  for (let i in _audio) {
    try {
      audio = _audio[i]
      isLimit = limitedSize < audio.fileSize
      if (isLimit) continue
      link = await audio.download()
      if (link) res = await fetch(link)
      isLimit = res?.headers.get('content-length') && parseInt(res.headers.get('content-length')) < limitedSize
      if (isLimit) continue
      if (res) source = await res.arrayBuffer()
      if (source instanceof ArrayBuffer) break
    } catch (e) {
      audio = link = source = null
      lastError = e
    }
  }
  if ((!(source instanceof ArrayBuffer) || !link || !res.ok) && !isLimit) throw 'Error: ' + (lastError || 'Can\'t download audio')
  if (!isY && !isLimit) await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', `
┏┉┉┉❬ *YOUTUBE* ❭┉┉┉┉⦁
┗⚋⚋⚋⚋⚋⚋⦁⦁⦁
⦁⦁☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷⦁⦁
⦁ *📝ᴛɪᴛʟᴇ:* ${title}
⦁ *🌿ᴛʏᴘᴇ:* ᴍᴘ3/ᴀᴜᴅɪᴏ
⦁ *⚖️ꜰɪʟᴇꜱɪᴢᴇ:* ${audio.fileSizeH}

*⏳L O A D I N G. . .*
ʙʏ Qᴜᴇᴇɴ-ꜱᴀᴋᴜʀᴀ-ᴍᴅ ©
⦁⦁☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷⦁⦁
`.trim(), m) // title + '.mp3',
  if (!isLimit) await conn.sendFile(m.chat, source, title + 'audio/mpeg', `
┏┉┉┉❬ *YOUTUBE* ❭┉┉┉┉⦁
┗⚋⚋⚋⚋⚋⚋⦁⦁⦁
⦁⦁☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷⦁⦁
⦁ *📝ᴛɪᴛʟᴇ:* ${title}
⦁ *🌿ᴛʏᴘᴇ:* ᴍᴘ3/ᴀᴜᴅɪᴏ
⦁ *⚖️ꜰɪʟᴇꜱɪᴢᴇ:* ${audio.fileSizeH}

*⏳L O A D I N G. . .*
ʙʏ Qᴜᴇᴇɴ-ꜱᴀᴋᴜʀᴀ-ᴍᴅ ©
⦁⦁☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷☷⦁⦁
`.trim(), m, null, {
    asaudio: chat.useaudio
  })
.trim(), m, null, {
    asaDocument: chat.useDocument
  })
handler.help = ['song', 'play'].map(v => 'yt' + v + ` <url> <without message>`)
handler.tags = ['downloader', 'limitmenu']
handler.command = /^yt(a|mp3)$/i

handler.exp = 0
handler.register = false
handler.limit = true

module.exports = handler
