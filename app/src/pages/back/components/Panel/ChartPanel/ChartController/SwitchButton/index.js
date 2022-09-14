import { BsFillTriangleFill } from 'react-icons/bs';
import {formatNumbers,formatDate,formatPosition,findIncrease} from '../../util';


const SwitchButton = ({ className, controller, onClick }) => {
    const isPositionNumber = (label) => {
        let str = label.toLowerCase().replace(/\W/g, '')
        return str == 'popularity' || str == 'ranked'
    }
    const formatValues = ({ label, increase, currentValue, increaseValue }) => {
        
        const toLabel = (str) => {
            let upperCase = str.charAt(0).toUpperCase() + str.slice(1)
            return upperCase + ":";
        }
        const toPercentage = (n1, n2) => {
            let amount = n1 * 100
            let percentage = amount / n2
            return `${percentage.toFixed(2)}%`
        }

        const formatNumbers = (str) => {
            if(isPositionNumber(label)){
                return Math.abs(parseInt(str))
            }
            let value = parseInt(str) / 1000

            if (value >= 1 && value < 1000) {
                return parseInt(value) + "K"
            }
            if (value >= 1000) {
                return parseFloat(value / 1000).toFixed(2) + "M"
            }
            return Math.abs(isPositionNumber(label) ? parseInt(str) : str)
        }
        const increaseValueFormat = (label) =>{
            if(!isPositionNumber(label))
                return `(${increase ? '+' : '-'}${formatNumbers(increaseValue)})`
            return `(${increase ? '-' : '+'}${formatNumbers(increaseValue)})`
        }
        increase = isPositionNumber(label) ? !increase : increase
        return {
            label: toLabel(label),
            increase,
            increaseValue: increaseValueFormat(label),
            percentage: toPercentage(increaseValue, currentValue),
            currentValue: isPositionNumber(label) ? '#' + currentValue : formatNumbers(currentValue)
        }
    }
    const { label, increase, percentage, currentValue, increaseValue } = formatValues(controller)
    return (
        <div className={className} onClick={() => onClick(controller)}>
            <h4>{label} </h4><span>{currentValue}</span>
            <p className={`rate ${increase ? 'positive' : 'negative'}`}>
                <span className='arrow'><BsFillTriangleFill /></span>
                {`${!isPositionNumber(label) ? percentage : ''} ${increaseValue}`}
            </p>
        </div>
    )
}

export default SwitchButton