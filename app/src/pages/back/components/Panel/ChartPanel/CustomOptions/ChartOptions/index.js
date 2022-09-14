import '../index.css'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'
import { CustomOptionsContext } from "../../../../../context/CustomOptionsContext"
import { useContext, useState } from "react"
const ChartOptions = ({ label }) => {
    const { allowDuplicate, setAllowDupliace } = useContext(CustomOptionsContext)

    return (

        <>
            <div className="option">
                <span className="label">Chart Options</span>
                <div className="flags">
                    <div className="flag">
                        <span className="flag-type">
                            Not Allow Duplicate Data
                        </span>
                        <label class="switch">
                            <input type="checkbox"  defaultChecked={allowDuplicate} onChange={() => setAllowDupliace(!allowDuplicate)}/>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChartOptions