import '../index.css'
import { MdExpandMore,MdExpandLess } from 'react-icons/md'
import { CustomOptionsContext } from "../../../../../context/CustomOptionsContext"
import { useContext, useState } from "react"
const Option = ({ label }) => {
    const { flagOptions } = useContext(CustomOptionsContext)
    return (

        <>
            <div className="option">
                <div className="flags">
                    <span className="label">{label}</span>
                    <div className="flag">
                        <span className="flag-type">
                            Release
                        </span>
                        <label class="switch">
                            <input type="checkbox" />
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="flag">
                        <span className="flag-type">
                            Finish
                        </span>
                        <label class="switch">
                            <input type="checkbox" />
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="flag">
                        <span className="flag-type">
                            Relantionship
                        </span>
                        <span>
                           <MdExpandMore/>
                        </span>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Option