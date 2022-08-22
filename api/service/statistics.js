
const axios = require('axios').default;
const cheerio = require('cheerio');
const { JSDOM } = require("jsdom");


const scrape = async (url) => {
    const shortUrl = url.match(/(?<=myanimelist\.net).*/g)

    console.log(`[Scrape] GET from  (${shortUrl})`)
    const { data: body } = await axios.get(url)
    console.log(`[Scrape] Loading cheerio ... (${shortUrl})`)
    const $ = cheerio.load(body);
    const { document } = (new JSDOM(body)).window;
    const texts = [`aired`, `status`, `popularity`, `ranked`, `members`, `favorites`,`image`]
    const values = []
    const erros = []

    const getValue = (text, value) => {
        const getAiredValue = (airedValues) => {
            const values = []
            const getDates = (value) => {
                let match = value.match(/([a-zA-z]{3,5})|(\d{1,2}(?=,))|(\d{4})/g)
                let start = match.splice(0, 3)
                let end = match
                return { start, end }
            }
            let { start, end } = getDates(airedValues)
            values.push({ text: "start_year", value: start[2] })
            values.push({ text: "end_year", value: end[2] })
            values.push({ text: "start_date", value: new Date(start) })
            values.push({ text: "end_date", value: new Date(end) })
            console.log(...values)
            return values
        }
        const getRankedValue = (value) => {
            return { text: 'ranked', value: value.match(/#\d+/g)[0] }

        }


        if (text == "aired") {
            return getAiredValue(value)
        }
        if (text == 'ranked') {
            return getRankedValue(value)
        }
        return { text, value }

    }
    const getScoreValues = () => {
        let values = []
        let [el] = Array.from(document.querySelectorAll('.dark_text')).filter(el => el.textContent.includes("Score:"))
        const scoreValues = el.parentElement.textContent.match(/(\d\.\d{2})|(?<=by\s)\d+/g)
        values.push(
            { text: 'scoreValue', value: scoreValues[0] || '' },
            { text: 'scoreCount', value: scoreValues[1] || '' }
        )
        return values
    }
    const getImage = () =>{
        let values = []
        const image = document.querySelector('[itemprop="image"]')
        if(!image){
            return values;
        }
        let src = image.getAttribute("data-src")
        values.push({ text: 'image', value: src })
        return values
    }
    const toObject = (values) => {
        const tmp = []
        values.forEach(({ text, value }) => {
            tmp[text] = value
        })
        return Object.assign({}, tmp)
    }



    const textAttributes = document.querySelectorAll('.dark_text')
    if(textAttributes.length == 0){
        throw Error("No page found in url")
    }
    textAttributes.forEach((el) => {
        let originalText = el.textContent
        let text = originalText.replace(':', ``).toLocaleLowerCase().trim()
        try {
            if (!texts.includes(text)) return
            let elContent = el.parentElement.textContent.replace(originalText, "").trim()
            let value = getValue(text, elContent)
            if (Array.isArray(value))
                return values.push(...value || value)
            return values.push(value)

        } catch (e) {
            console.log(`[Scrape] Error on collecting ${text} (${shortUrl})`)
            erros.push('Error on collecting ${text}')
        }
    })

    values.push(...getScoreValues())
    values.push(...getImage())
    return { statistics: toObject(values) }
}
module.exports = scrape