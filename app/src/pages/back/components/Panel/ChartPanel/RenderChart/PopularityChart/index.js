
import '../../index.css';
import {formatNumbers, formatDate, removeRepeatValues } from '../../util';
import {BarChart, Bar,LabelList, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import MainTooltip from '../CustomTooltips/Maintooltip';
const PopularityChart = ({ data, dataKey, animationDuration }) => {
    
    const maxDataSize = 35
    
    const popularityData = removeRepeatValues(data)
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
       const sorted = popularityData.map(({value}) => parseFloat(value)).sort((a,b) => a - b).filter((n) => n)
       const minValue = Math.round((getValueByPosition(sorted,-1) * 2)/100)*100;
       let max = 1
       let min =  minValue >= 100 ? minValue : 100
        console.log(sorted)
        console.log( min,max)
        console.log(popularityData)
       return [min, max]
    }
    const revertBars = () =>{
        const [min,max] = getDomainScore()
        let revertData = [...popularityData].map(data =>{
            data.reverse_value = max - data.value
            return data
        })
        console.log(revertData)
        return revertData
    }
    return (
        <>
            <BarChart width={1150} height={280} data={revertBars()} margin={{ top: 5, right: 10, bottom: 5, left: 30 }}>
                <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset={"0%"} stopColor={"#2451B7"} stopOpacity={0.4} />
                        <stop offset={"75%"} stopColor={"#2451B7"} stopOpacity={0.05} />
                    </linearGradient>
                </defs>
                <Bar animationDuration={animationDuration} dataKey={dataKey || "value"} stroke="#2451B7" fill="url(#color)">
                    
                    {popularityData.length <= maxDataSize && <LabelList dataKey={"value"} position="center" style={{fill: '#fff'}}/>    }
                </Bar>
                <XAxis dataKey="date" tickFormatter={formatXAxis} axisLine={false}/>
                <YAxis tickFormatter={formatYAxis} axisLine={false} allowDataOverFlow={true} domain={[1,100]}/>
                <Tooltip cursor={{fill: '#ffffff4d'}} content={<MainTooltip data={data} />} />
                <CartesianGrid opacity={0.1} vertical={false} />
            </BarChart>
        </>

    )

}


export default PopularityChart