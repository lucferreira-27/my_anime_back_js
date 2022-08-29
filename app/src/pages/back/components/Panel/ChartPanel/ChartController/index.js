
import { useState, useContext } from "react"
import SwitchButton from "./SwitchButton"
import { ChartContext } from "../../../../context/ChartContext"
const ChartController = ({ controllers }) => {
    const { activeController, setActiveController } = useContext(ChartContext)

    return (
        <div className='controllers'>
            {controllers.map((controller,index) => {
                let className = activeController == controller ? 'select' : ''
                if(activeController == null && index == 0){
                    className = 'select'
                }
                return <SwitchButton
                    className={className}
                    controller={controller}
                    onClick={(controller) => setActiveController(controller)} />
            }
            )}
        </div>

    )
}

export default ChartController