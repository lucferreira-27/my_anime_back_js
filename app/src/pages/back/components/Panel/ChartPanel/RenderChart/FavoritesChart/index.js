
import '../../index.css';
import { format, parseISO, } from 'date-fns'
import { Area, AreaChart, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const FavoritesChart = ({ data, dataKey, animationDuration }) => {
    const formatXAxis = (str) => {
        try {
            const date = parseISO(str)
            return format(date, "MMM, yyyy")
        } catch (e) {
            return ""
        }

    }
    const formatMembers = (str) =>{
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
    return (
        <AreaChart width={1100} height={280} data={data} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
            <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={"0%"} stopColor={"#2451B7"} stopOpacity={0.4} />
                    <stop offset={"75%"} stopColor={"#2451B7"} stopOpacity={0.05} />
                </linearGradient>
            </defs>
            <Area animationDuration={animationDuration} dataKey={dataKey || "value"} stroke="#2451B7" fill="url(#color)" />
            <XAxis dataKey="date" tickFormatter={formatXAxis}  axisLine={false} />
            <YAxis tickFormatter={formatYAxis} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
    )

}

const CustomTooltip = ({active, payload, label, data})=> {

    const formatMembers = (str) =>{
        let value = parseInt(str) / 1000
        if (value >= 1 && value < 1000) {
            return parseInt(value) + "K"
        }
        if (value > 1000) {
            return parseFloat(value / 1000).toFixed(2) + "M"
        }
        return parseFloat(str)
    }
    
    const formatDate = (str, template) =>{
        try {
            const date = parseISO(str)
            return format(date, template)
        } catch (e) {
            return ""
        }
    }
    if(active && payload){
        if(!payload[0]) return ""
        return(
            <div className='tooltip'>
                <h4>{formatDate(label,"dd/MM/yyyy")}</h4>
                <p>{`${formatMembers(payload[0].value)}`}</p>
            </div>
        )
    }

}

export default FavoritesChart