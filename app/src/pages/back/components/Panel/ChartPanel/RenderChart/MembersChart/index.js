
import '../../index';
import { formatNumbers, formatDate, parseTimestamp } from '../../util';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import FinishReference from '../ReferenceLine/FinishReference';
import ReleaseReference from '../ReferenceLine/ReleaseReference';
import MainTooltip from '../CustomTooltips/Maintooltip';
import { CustomOptionsContext } from '../../../../../context/CustomOptionsContext';
import { useContext } from 'react';

const MembersChart = ({ info, data, dataKey, animationDuration }) => {
    const { flagOptions } = useContext(CustomOptionsContext)
    
    const flagActive = (flagOptions.release || flagOptions.finish) && {
        scale:'time',
        type:'number'
    };
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
            <XAxis
                domain={data[0] && [data[0].date, data[data.length - 1].date]}
                dataKey="date"
                tickFormatter={formatXAxis}
                axisLine={false}
                {...flagActive}
                />
            <YAxis tickFormatter={formatYAxis} axisLine={false} />
            <Tooltip content={<MainTooltip data={data} chartType='area' />} />
            {
                flagOptions.release
                &&
                <ReferenceLine x={info && new Date(info.start_date).getTime()}
                    stroke="green"
                    label={
                        {
                            value: 'Release',
                            fill: 'white',
                            position: "insideTopRight"
                        }
                    }
                    fill="violett" />
            }
            {
                flagOptions.finish
                &&
                <ReferenceLine x={info && new Date(info.end_date).getTime()}
                    stroke="red"
                    label={
                        {
                            value: 'Finish',
                            fill: 'white',
                            position: "insideTopRight"
                        }
                    }
                    fill="violett" />
            }
            <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
    )

}


export default MembersChart