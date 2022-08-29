import Option from "./Option"

const ChartOptions = ({ options=[] }) => {
    return (
        <div className='options'>
            <span>CHART OPTIONS</span>
            {options.map(option => {
                return <Option option={option}/>
            })}
        </div>
    )
}

export default ChartOptions