
import '../../index.css';
import { format, parseISO, } from 'date-fns'
import {formatNumbers, formatDate, formatPosition, findIncrease, removeRepeatValues } from '../../util';
import { Area, AreaChart, BarChart, Bar, LineChart, Line,LabelList, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import MainTooltip from '../CustomTooltips/Maintooltip';
const ScoreChart = ({ data, dataKey, animationDuration }) => {
    
    const maxDataSize = 35
    

    const scoreData = removeRepeatValues(data)
    const formatXAxis = (str) => {
        try {
            return formatDate(str, "MMM, yyyy")
        } catch (e) {
            return ""
        }
    }

    const formatYAxis = (str) => {

        return formatNumbers(str)
    }

    const getDomainScore = () =>{
        const getValueByPosition = (contents, position) =>{
            for(let content of position == 1 ? contents : [...contents].reverse()){
                if(content > 0){
                    return content
                }
            }
        }
       const sorted = scoreData.map(({value}) => parseFloat(value)).sort((a,b) => a - b).filter((n) => n)
       let min = Math.floor(parseFloat((getValueByPosition(sorted,1) - 0.5).toFixed(2))) 
       let max = Math.ceil(parseFloat((getValueByPosition(sorted,-1) + 0.5).toFixed(2)))
        console.log(sorted)
        console.log(min,max)
        console.log(scoreData)
       return [min, max]
    }
    return (
        <>
            <BarChart width={1150} height={280} data={scoreData} margin={{ top: 5, right: 10, bottom: 5, left: 30 }}>
                <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset={"0%"} stopColor={"#2451B7"} stopOpacity={0.4} />
                        <stop offset={"75%"} stopColor={"#2451B7"} stopOpacity={0.05} />
                    </linearGradient>
                </defs>
                <Bar animationDuration={animationDuration} dataKey={dataKey || "value"} stroke="#2451B7" fill="url(#color)">
                    
                    {scoreData.length <= maxDataSize && <LabelList dataKey={"value"} position="center" style={{fill: '#fff'}}/>    }
                </Bar>
                <XAxis dataKey="date" tickFormatter={formatXAxis} axisLine={false} />
                <YAxis tickFormatter={formatYAxis} axisLine={false} allowDataOverFlow={true} domain={getDomainScore()}/>
                <Tooltip cursor={{fill: '#ffffff4d'}} content={<MainTooltip data={data} />} />
                <CartesianGrid opacity={0.1} vertical={false} />
            </BarChart>
        </>

    )

}



export default ScoreChart