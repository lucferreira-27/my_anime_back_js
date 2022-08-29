const SwitchButton = ({ className,controller,onClick }) => {
    const isPositionNumber = (label)=>{
        let str = label.toLowerCase().replace(/\W/g,'')
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

        const formatNumbers = (str) =>{
            let value = parseInt(str) / 1000
            if (value >= 1 && value < 1000) {
                return parseInt(value) + "K"
            }
            if (value >= 1000) {
                return parseFloat(value / 1000).toFixed(2) + "M"
            }
            return Math.abs(isPositionNumber(label) ? parseInt(str) : str)
        }
        increase = isPositionNumber(label) ? !increase : increase
        return {
            label: toLabel(label),
            increase,
            increaseValue: `(${increase ? '+' : ''}${formatNumbers(increaseValue)})`,
            percentage: toPercentage(increaseValue, currentValue),
            currentValue: isPositionNumber(label) ? '#' + currentValue : formatNumbers(currentValue)
        }
    }
    const { label, increase, percentage,currentValue,increaseValue } = formatValues(controller)
    return (
        <div className={className} onClick={() => onClick(controller)}>
            <span>{label} </span><span>{currentValue}</span>
            <p>{`${!isPositionNumber(label) ? percentage :  ''} ${increaseValue}`}</p>
        </div>
    )
}

export default SwitchButton