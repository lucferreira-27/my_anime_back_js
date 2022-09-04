import '../index.css'
import { formatNumbers, formatDate, formatPosition, findIncrease } from '../../../util';

const MainTooltip = ({ active, payload, label, data, chartType }) => {

    if (!(active && payload) || !payload[0]) return ""

    try{
        return (
            <div className='tooltip'>
                <h4>{formatDate(label, "dd/MM/yyyy")}</h4>
                <p>{`${formatNumbers(payload[0].value)}`}</p>
            </div>
        )
    }catch(e){
        console.log(e,label)
        return ""
    }





}

export default MainTooltip