import FlagOptions from "./FlagOptions"
import ChartOptions from "./ChartOptions"
import { useContext, useState } from "react"

const CustomOptions = ({ options = [] }) => {


    return (
        <div className='options'>
            <ChartOptions />
            <FlagOptions />
        </div>
    )
}

export default CustomOptions