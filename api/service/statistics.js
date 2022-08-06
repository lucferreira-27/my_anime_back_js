
const axios = require('axios').default;
const cheerio = require('cheerio');


const scrape = async (url) =>{
    console.log(url)
    const shortUrl = url.match(/(?<=myanimelist\.net).*/g)

    console.log(`[Scrape] GET from  (${shortUrl})`)
    const {data: body} = await axios.get(url)
    console.log(`[Scrape] Loading cheerio ... (${shortUrl})`)
    const $ = cheerio.load(body);
    const infos = [`score`,`ranked`,`popularity`,`members`,`favorites`]
    const statistics = []
    console.log(`[Scrape] Scraping html ... (${shortUrl})`)
    $('span.dark_text').each(function (i, elem) {
        let text = $(this).text().replace(`:`,``).toLocaleLowerCase().trim()
        try{
            if(!infos.includes(text)) return
            let info = $(this).parent().text();
            let found = info.match(/\d+\.?,?\d+|#\d+/g)
            statistics[text] = found[0]    
        }catch(e){
            console.log(`[Scrape] Error on collecting ${text} (${shortUrl})`)
        }
    });

    const notifyErros = () =>{
        const totalErros = Object.values(infos).filter(value =>{
            if(!Object.keys(statistics).find((key => value == key))){
                console.log(`[Scrape] Error key: ${value} is undefine! (${shortUrl})`)
                return true
            }
            return false
        })
        if(Object.keys(statistics).length  == 0){
            console.log(`[Scrape] Failed! ${shortUrl}`)
            throw Error(`Scrape failed because desired data was not found! (${shortUrl})`)
         }
        if(totalErros.length > 0){
            console.log(`[Scrape] Scrape has erros, but successed (${shortUrl})`)
            console.log(`[Scrape] Done! (${shortUrl})` )
            return {statistics: Object.assign({containsErros: true},statistics)}
        }
        console.log(`[Scrape] Done! (${shortUrl})`)
        return {statistics: Object.assign({containsErros: false},statistics)}
    }

    return notifyErros()
}

module.exports = scrape