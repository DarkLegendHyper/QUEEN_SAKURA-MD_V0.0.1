import axios from 'axios'
import cheerio from 'cheerio'


let handler = async (m, { text }) => {
	if (!text) throw `🌿 please use en Wikipedia` 
	
    try {
	const link =  await axios.get(`https://es.wikipedia.org/wiki/${text}`)
	const $ = cheerio.load(link.data)
	let wik = $('#firstHeading').text().trim()
	let resulw = $('#mw-content-text > div.mw-parser-output').find('p').text().trim()
	m.reply(`⦁⚋⚋⚋❲ *Wikipedia* ❳⚋⚋⚋⦁

⦁ Tool : ${wik}

${resulw}`)
} catch (e) {
  m.reply('⚠️ Not have ')
}
}
handler.help = ['wikipedia']
handler.tags = ['tools']
handler.command = ['wiki','wikipedia'] 


export default handler
