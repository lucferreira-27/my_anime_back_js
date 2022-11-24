
const axios = require('axios').default;
const { JSDOM } = require("jsdom");

const getInfo = (url) => {
    const shortUrl = url.match(/(?<=myanimelist\.net).*/g)[0]
    let match = url.match(/\d{8}/g)
    const { data: body } = await axios.get(url)
    console.log(`[Scrape] Loading cheerio ... (${shortUrl})`)
    const { document } = (new JSDOM(body)).window;

    const getPopularity = () => {
       let value = document.querySelector('.numbers.popularity strong').textContent.replace(",",'')
       const popularity = value.match(/\d+/g)[0]
       return popularity
    }
    const getRanked = () => {
        let value = document.querySelector('.numbers.ranked strong').textContent.replace(",",'')
        const ranked = value.match(/\d+/g)[0]
        return ranked
    }
    const getMembers = () => {
        let value = document.querySelector('.numbers.members strong').textContent.replace(",",'')
        const members = value.match(/\d+/g)[0]
        return members
    }
    const getFavorites = () => {
        let value = document.querySelector('#content > table > tbody > tr > td.borderClass > div > div:nth-child(28)').textContent.replace(",",'')
        const favorites = value.match(/\d+/g)[0]
        return favorites

    }
    const getScoreValue = () => {
        let value = document.querySelector('.fl-l.score').dataset.user.replace(",",'')
        const users = value.match(/\d+/g)[0]
        return users

    }
    const getScoreRanked = () => {
        let value = document.querySelector('.score .score-label').textContent
        const score = value.match(/\d+\.\d{2}/g)[0]
        return score
    }
    const getInfoStatus = () => {
        let value = document.querySelector('#content > table > tbody > tr > td.borderClass > div > div:nth-child(17)').textContent.replace(",",'')
        const status = value.replaceAll(/\s+/g,'').match(/(?<=:).+/g)[0]
        return status
    }
    const getInfoDateEnd = () => {
        let value = document.querySelector('#content > table > tbody > tr > td.borderClass > div > div:nth-child(19)').textContent.replace(",",'')
        let match = value.match(/([a-zA-z]{3,5})|(\d{1,2}(?=,))|(\d{4})/g)
        let start = match.splice(0, 3)
        let end = match
        return { start, end }

    }
    const getInfoDateStart = () => {
    
    }
    const getRelantionships = () =>{

    }
}
