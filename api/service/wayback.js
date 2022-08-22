
const { getBetweenDates, skipDate } = require("./dates")

const wayback = (url, config) => {
    const toWayBackUrl = (date) => {

        const archiveUrl = "https://web.archive.org/web"

        const toTimestamp = (date) => {
            return date.toISOString().slice(0, 10).replaceAll("-", "")
        }
        const buildWayBackUrl = (timestamp, searchUrl) => {
            return `${archiveUrl}/${timestamp}/${searchUrl}`
        }

        let timestamp = toTimestamp(date.value)
        let waybackUrl = buildWayBackUrl(timestamp, url)
        date.waybackUrl = waybackUrl
        return date
    }
    const getFilters = ({start,end,space,period}) =>{
        
        const filters = {}
        const setDate = (intDate) =>{
            if(intDate.toString().length == 4){
                const objDate = new Date(intDate.toString())
                objDate.setFullYear(objDate.getFullYear() + 1)
                return objDate
            }
            return new Date(intDate.toString())
        }
        const setSpace = (space) =>{
            const defaultSpace = {day: 7, month: 6, year: 1}
            if(!space) return defaultSpace[filters.period]
            let match = space.match(/[\d]/g)
            if(!(match && match.length == space.length)) throw Error(`Only numbers in the space between periods`)
            return parseInt(match)
        }
        const setPeriod = (period) =>{
            const defaultPeriod = 'month'
            const allPeriods = ['day','month','year']
            if(!period) return defaultPeriod
            if(!allPeriods.includes(period)) throw Error(`Period "${period}" is not valid. Periods are ${allPeriods}`)
            return period
        }
        filters.startDate = start && setDate(config.start)
        filters.endDate = end && setDate(config.end)
        filters.period = setPeriod(period)
        filters.space = setSpace(space)

        return filters
    }

    const filters = getFilters(config)

    return getBetweenDates(url, filters)
        .then((dates) => skipDate(dates, filters).map(toWayBackUrl))


}




module.exports = wayback