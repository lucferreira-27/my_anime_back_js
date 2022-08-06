const axios = require('axios').default;
const calendarUrl = "https://web.archive.org/__wb/calendarcaptures/2"
const availableUrl = "https://archive.org/wayback/available"


const buildCalendarUrl = (year, searchUrl) => {
    return `${calendarUrl}?url=${searchUrl}&date=${year}&groupby=day`
}
const buildAvailableUrl = (timestamp, searchUrl) => {
    return `${availableUrl}?url=${searchUrl}&timestamp=${timestamp}`
}

const getYearTimestamp = (timestamp) => {
    return timestamp.match(/^\d{4}/g)
}

const toDate = (year,item) => {
    let newItem = item[0].toString().length > 3 ? item[0].toString() : '0' + item[0]
    let matchs = newItem.match(/\d{2}/g)
    let month = matchs[0]
    let day = matchs[1]
    return new Date(`${year}-${month}-${day}`)
}


const getBetweenDates = async (url,{startDate, endDate}) =>{
    if(!endDate){
        endDate = new Date()
    }

    console.log("[Dates] Getting oldest year available ...")
    const initYear = 0
    let oldestUrl = buildAvailableUrl(initYear, url)
    console.log("[Dates] Get url: " + oldestUrl)
    return new Promise((resolve,reject) =>{
        axios.get(oldestUrl).then(async ({ data }) => {
            let dateItems = []

            let timestamp = data.archived_snapshots.closest.timestamp
            let firstYear = getYearTimestamp(timestamp)
            let currentYear = new Date().getFullYear()
            const calendarPromises = []
            console.log("[Dates] Building calendar url for each year ...")
            for (let year = firstYear; year <= currentYear; year++) {
                let calendarUrl = buildCalendarUrl(year, url)
                console.log("[Dates] Builded " + calendarUrl)
                calendarPromises.push({promise: axios.get(calendarUrl), year})
            }
            Promise.all(calendarPromises.map(c => c.promise)).then(values =>{
                console.log(`[Dates] Sending ${values.length} requests to WayBackMachine ...`)
                for(let i = 0; i < values.length; i++){
                    let { data: { items } } = values[i]
                    let dates = items.filter(item => item[1] == 200).map(item => toDate(calendarPromises[i].year,item))
                    console.log(`[Dates] New dates created ${dates[0].toISOString()} - ${dates[dates.length - 1].toISOString()}`)
                    dateItems.push(dates)
                }
                console.log(`[Dates] Manage dates ...`)
                console.log(`[Dates] Start: ${startDate} | End: ${endDate}`)
                let filterItems = dateItems
                                .reduce((prev, current) => [...current, ...prev], [])
                                .filter(item => {
                                    if(!startDate){
                                        return item <= endDate
                                    }
                                    return item >= startDate && item <= endDate
                                })
                if(filterItems.length == 0){
                    reject({msg: "No dates found after filtered"})
                }
                resolve(filterItems)
            })
    
    
    
        }).catch(error => {
            reject(error)
        })
    })

}
const skipDate = (dates,{period,space}) =>{
    const sortedDates = dates.sort((a,b) => b - a)
    
    const getNotSkippable = (changeTime) =>{
        const MS_PER_DAY = 1000 * 60 * 60 * 24;
        let notIgnoreDates = []
        notIgnoreDates.push({value: sortedDates[sortedDates.length - 1],distance: 0})
        let tmpDate = new Date(`${notIgnoreDates[0].value.getFullYear()}-01-02`); 
        while(tmpDate < sortedDates[0]){
            let closest = findClosest(tmpDate,sortedDates)
            let distance = Math.floor((closest.getTime() - tmpDate.getTime()) / MS_PER_DAY)
            if(notIgnoreDates.find(ignore => ignore.value.getTime() == closest.getTime())){
                changeTime(tmpDate)
                continue
            }
            notIgnoreDates.push({value: new Date(closest.getTime()),distance})
            changeTime(tmpDate)
        }
        return notIgnoreDates
    }

    if(period == 'day') return  getNotSkippable((tmpDate) => tmpDate.setDate(tmpDate.getDate() + space))
    if(period == 'month') return  getNotSkippable((tmpDate) => tmpDate.setMonth(tmpDate.getMonth() + space))
    if(period == 'year') return  getNotSkippable((tmpDate) => tmpDate.setFullYear(tmpDate.getFullYear() + space))
    throw Error("DateType not valied")

    
}




const findClosest = (targetDate, allDates,forwards = true) =>{
    const array = [...allDates]
    return array.sort((a, b) => {
        var distancea = Math.abs(targetDate - a)
        var distanceb = Math.abs(targetDate - b)
        return distancea - distanceb
    }).filter((date =>{
        if(!forwards) return
            return date >= targetDate
    }))[0]
}




module.exports = {getBetweenDates,skipDate}
