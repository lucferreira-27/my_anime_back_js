import { ReferenceLine } from 'recharts';


const ReleaseReference = ({ info }) => {
    return (
        <ReferenceLine
            x={info && new Date(info.start_date).getTime()}
            stroke="green"
            label={
                {
                    value: 'Release',
                    fill: 'white',
                    position: "insideTopRight"
                }
            }
            fill="violett" />
    )
}

export default ReleaseReference