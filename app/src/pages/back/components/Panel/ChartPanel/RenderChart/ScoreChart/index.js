
import './index.css';
import { format, parseISO, } from 'date-fns'
import { Area, AreaChart, BarChart, Bar, LineChart, Line,LabelList, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const ScoreChart = ({ data, dataKey, animationDuration }) => {
    
    
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
    const scoreData = removeRepeatValues(data)
    const formatXAxis = (str) => {
        try {
            const date = parseISO(str)
            return format(date, "MMM, yyyy")
        } catch (e) {
            return ""
        }

    }
    const formatMembers = (str) => {
        let value = parseInt(str) / 1000
        if (value >= 1 && value < 1000) {
            return value + "K"
        }
        if (value > 1000) {
            return (value / 1000) + "M"
        }
        return str
    }
    const formatYAxis = (str) => {

        return formatMembers(str)
    }

    const getDomainScore = () =>{
       const sorted = scoreData.map(({value}) => parseFloat(value)).sort((a,b) => a - b)
       
       return [sorted[0] - 0.5, sorted[sorted.length - 1] + 0.5]
    }
    return (
        <>
            <BarChart width={1000} height={280} data={scoreData} margin={{ top: 5, right: 10, bottom: 5, left: 30 }}>
                <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset={"0%"} stopColor={"#2451B7"} stopOpacity={0.4} />
                        <stop offset={"75%"} stopColor={"#2451B7"} stopOpacity={0.05} />
                    </linearGradient>
                </defs>
                <Bar animationDuration={animationDuration} dataKey={dataKey || "value"} stroke="#2451B7" fill="url(#color)">
                    <LabelList dataKey={"value"} position="top" style={{fill: '#fff'}}/>    
                </Bar>
                <XAxis dataKey="date" tickFormatter={formatXAxis} axisLine={false} />
                <YAxis tickFormatter={formatYAxis} axisLine={false} allowDataOverFlow={true} domain={getDomainScore()}/>
                <Tooltip cursor={{fill: '#ffffff4d'}} content={<CustomTooltip />} />
                <CartesianGrid opacity={0.1} vertical={false} />
            </BarChart>
        </>

    )

}

const CustomTooltip = ({ active, payload, label, data }) => {

    const formatMembers = (str) => {
        let value = parseInt(str) / 1000
        if (value >= 1 && value < 1000) {
            return parseInt(value) + "K"
        }
        if (value > 1000) {
            return parseFloat(value / 1000).toFixed(2) + "M"
        }
        return parseFloat(str)
    }

    const formatDate = (str, template) => {
        try {
            const date = parseISO(str)
            return format(date, template)
        } catch (e) {
            return ""
        }
    }
    if (active && payload) {
        return (
            <div className='tooltip'>
                <h4>{formatDate(label, "dd/MM/yyyy")}</h4>
                <p>{`${payload[0].value}`}</p>
            </div>
        )
    }

}

export default ScoreChart