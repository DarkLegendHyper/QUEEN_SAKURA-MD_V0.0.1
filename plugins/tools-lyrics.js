
import fg from 'api-dylux'
let handler = async (m, {conn, text }) => {
  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
   if (!teks) throw `🌿please Enter the Text .lyrics Lelena`
   try {
 let res = await fg.lyrics(text);
 let mes = `⦁⦁⚋⚋❲ *𝑄𝑈𝛯𝛯𝛮-𝑆𝛥𝛫𝑈𝑅𝛥_𝛭𝐷* ❳⚋⚋⦁⦁
⦁🎀 *${res.title}*
⦁⚡ *${res.artist}*

⦁🔱 ${res.lyrics}`;
    conn.sendFile(m.chat, res.thumb, 'img.png', mes, m);
} catch (e) {
	m.react(error)
} 

}
handler.help = ['lyrics']
handler.tags = ['tools']
handler.command = ['letra', 'lyrics', 'letras'] 

export default handler
