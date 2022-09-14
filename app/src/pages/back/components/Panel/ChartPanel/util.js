import { format, parseISO, } from 'date-fns'

const parseTimestamp = (timestamp) =>{
    return new Date(timestamp.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'))
}

const formatNumbers = (str) => {
    let value = parseInt(str) / 1000

    if (value >= 1 && value < 1000) {
        return parseInt(value) + "K"
    }
    if (value >= 1000) {
        return parseFloat(value / 1000).toFixed(2) + "M"
    }
    return Math.abs(str)
}

const formatDate = (str, template) => {

    const date = new Date(str)
    
    return format(date, template)

}

const formatPosition = (position) => {
    return Math.abs(parseInt(position))

}

const findIncrease = (fistValue, secondValue) => {
    let { porcentage, absolute, increase } = ''
}


const removeRepeatValues  = (data) =>{
    const repeatValues = data
    const noRepeatValues = [data[0]]
    repeatValues.forEach((content) =>{
        
        let found = noRepeatValues.find(repeatContent => repeatContent.value == content.value)
        if(found){
            return
        }
        noRepeatValues.push(content)
    })
    return noRepeatValues
}

export { formatNumbers, formatDate, formatPosition, findIncrease,removeRepeatValues,parseTimestamp }