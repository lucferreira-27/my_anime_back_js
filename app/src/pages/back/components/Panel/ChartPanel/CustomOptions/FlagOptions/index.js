import '../index.css'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'
import { CustomOptionsContext } from "../../../../../context/CustomOptionsContext"
import { useContext, useState } from "react"
import RelantionshipOptions from './RelantionshipOptions'
const FlagOptions = ({ label,relationships }) => {
    const { flagOptions, setFlagOptions, isRelaseDisable, isFinishDisable } = useContext(CustomOptionsContext)
    const {defaultRelease, defaultFinish, defaultRelationships} = flagOptions
    const [showRelationships, setShowRelationships] = useState(false)
    const updateCheckBox = ({target}) =>{
        let name = target.name
        flagOptions[name] = target.checked
        
        
        setFlagOptions({...flagOptions})
    }
    return (

        <>
            <div className="option">
                <span className="label">Flags</span>
                <div className="flags">
                    <div className="flag">
                        <span className="flag-type">
                            Release
                        </span>
                        <label class="switch">
                        <input type="checkbox" name='release' disabled={isRelaseDisable} defaultChecked={defaultRelease} onChange={(e) => updateCheckBox(e)} />
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="flag">
                        <span className="flag-type">
                            Finish
                        </span>
                        <label class="switch">
                            <input type="checkbox" name='finish' disabled={isFinishDisable} defaultChecked={defaultFinish}  onChange={(e) => updateCheckBox(e)} />
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="flag">
                        <span className="flag-type">
                            Relantionship
                        </span>
                        <span>
                           {showRelationships && <MdExpandLess onClick={(() => setShowRelationships(false))} /> }
                           {!showRelationships && <MdExpandMore onClick={(() => setShowRelationships(true))} /> }
                        </span>
                    </div>
                   {showRelationships && <RelantionshipOptions/>}

                </div>
            </div>
        </>
    )
}

export default FlagOptions