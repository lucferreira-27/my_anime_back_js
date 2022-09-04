
import '../../index.css';
import { format, parseISO, } from 'date-fns'
import {formatNumbers, formatDate, formatPosition, findIncrease } from '../../util';
import MainTooltip from '../CustomTooltips/Maintooltip';
import { Area, AreaChart, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const FavoritesChart = ({ data, dataKey, animationDuration }) => {
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
            <Tooltip content={<MainTooltip data={data} />} />
            <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
    )

}


export default FavoritesChart