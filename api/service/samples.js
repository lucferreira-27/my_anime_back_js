
const axios = require('axios').default;
const { JSDOM } = require("jsdom");


const scrape = async (url) => {
    const shortUrl = url.match(/(?<=myanimelist\.net).*/g)[0]
    let match = url.match(/\d{8}/g)
    const timestamp = match ? match[0] : null
    console.log(`[Scrape] GET from  (${shortUrl})`)
    const { data: body } = await axios.get(url)
    console.log(`[Scrape] Loading cheerio ... (${shortUrl})`)
    const { document } = (new JSDOM(body)).window;
    const attributes = [shortUrl.includes("/anime/") ? `aired` : `published`,
        `status`,
        `popularity`,
        `ranked`,
        `members`,
        `favorites`,
        `score-value`,
        `score-ranked`
    ]

    const values = []
    values.push(getName(document))
    values.push(...getOthersValues(document, attributes))
    values.push(...getScoreValues(document))
    values.push(...getImage(document))
    values.push(getMyAnimeListUrl(document))
    values.push(getMediaType(document))

    return { samples: toObject(values), timestamp }
}


const getValue = (text, value) => {
    const getStatusValue = (airedValues) => {
        try {
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
            return values
        } catch (e) {
            console.log("[Scrape] ERROR GETTING STATUS VALUE", e)
            return { text: 'status', value: null }
        }

    }
    const getPositionValue = (text, value) => {
        try {
            return { text: text, value: value.match(/\d+/g)[0] }
        } catch (e) {
            console.log(`[Scrape] ERROR GETTING ${text.toUpperCase()} VALUE`, e)
            return { text: 'ranked', value: null }
        }
    }

    if (text == `aired` || text == `published`) {
        return getStatusValue(value)
    }
    if (text == 'ranked' || text == 'popularity') {
        return getPositionValue(text, value)
    }

    return { text, value }

}

const getOthersValues = ((document, attributes) => {
    const cleanUp = () => {
        document.querySelectorAll('sup').forEach(el => el.parentNode.removeChild(el))
        document.querySelectorAll("[itemprop='ratingCount']").forEach(el => el.parentNode.removeChild(el))
    }

    cleanUp()
    const values = []
    const textAttributes = document.querySelectorAll('.dark_text')
    if (textAttributes.length == 0) {
        throw Error("No page found in url")
    }
    textAttributes.forEach((el) => {
        let originalText = el.textContent
        let text = originalText.replace(':', ``).toLocaleLowerCase().trim()
        try {
            if (!attributes.includes(text)) return
            let elContent = el.parentElement.textContent.replace(originalText, "").trim()
            let value = getValue(text, elContent)
            if (Array.isArray(value))
                return values.push(...value || value)
            return values.push(value)

        } catch (e) {
            console.log(`[Scrape] Error on collecting ${text} (${shortUrl})`)
            console.log(e)
        }
    })
    return values
})


const getMyAnimeListUrl = (document) => {
    try {
        const el = document.querySelector("[rel='canonical']")
        const value = el.href
        return { text: 'url', value }
    } catch (e) {
        console.log("[Scrape] ERROR GETTING MY ANIME LIST URL VALUE", e)
        return { text: 'url', value: null }
    }
}

const getMediaType = (document) => {
    try {
        let [el] = Array.from(document.querySelectorAll('.dark_text + a'))
            .filter(el => el.parentElement.textContent.includes("Type:"))
        return { text: 'media_type', value: el.textContent }
    } catch (e) {
        console.log("[Scrape] ERROR GETTING MEDIA TYPE VALUE", e)
        return { text: 'media_type', value: null }
    }

}
const getName = (document) => {
    try {
        let nameElement = document.querySelector(".title-name")
        let value = nameElement ? nameElement.textContent : document.querySelector("[itemprop='name']").textContent
        return { text: 'name', value }
    } catch (e) {
        console.log("[Scrape] ERROR GETTING NAME VALUE", e)
        return { text: 'name', value: null }
    }

}

const getScoreValues = (document) => {
    try {
        let values = []
        let [el] = Array.from(document.querySelectorAll('.dark_text')).filter(el => el.textContent.includes("Score:"))
        let textContent = el.parentElement.textContent
        if(textContent.includes('N/A') || textContent.includes('0.00')){
            values.push(
                { text: 'score',  value: null },
                { text: 'score_users', value: null }
            )
            return values
        }
        const scoreValues = textContent.match(/(\d\.\d{2})|(?<=by\s)(\d+,?)+/g)
        values.push(
            { text: 'score', value: scoreValues[0] || '' },
            { text: 'score_users', value: scoreValues[1] || '' }
        )
        return values
    } catch (e) {
        console.log("[Scrape] ERROR GETTING SCORE VALUES", e)
        return null
    }

}
const getImage = (document) => {
    try {
        let values = []
        const image = document.querySelector('[itemprop="image"]')
        if (!image) {
            return values;
        }
        let src = image.getAttribute("data-src")
        values.push({ text: 'image_url', value: src })
        return values
    } catch (e) {
        console.log("[Scrape] ERROR GETTING IMAGE VALUE", e)
        return { text: 'image_url', value: null }
    }

}

const toObject = (values) => {
    const tmp = []
    values.forEach(({ text, value }) => {
        tmp[text] = value
    })
    return Object.assign({}, tmp)
}

module.exports = scrape