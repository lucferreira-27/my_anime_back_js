import { ReferenceLine } from 'recharts';


const FinishReference = ({ info }) => {
    return (
        <ReferenceLine
            x={info && new Date(info.end_date).getTime()}
            stroke="red"
            label={
                {
                    value: 'Finish',
                    fill: 'white',
                    position: "insideTopRight"
                }
            }
        />
    )
}

export default FinishReference