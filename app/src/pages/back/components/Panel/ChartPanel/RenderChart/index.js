import CustomOptions from "../CustomOptions"
import MembersChart from "./MembersChart"
import ScoreChart from "./ScoreChart"
import FavoritesChart from "./FavoritesChart"
import RankedChart from "./RankedChart"
import PopularityChart from "./PopularityChart"
import { ChartContext } from "../../../../context/ChartContext"
import { PanelContext } from "../../../../context/PanelContext"
import { CustomOptionsContext } from "../../../../context/CustomOptionsContext"
import { useContext, useEffect, useState } from "react"

const RenderChart = () => {
    const { activeController: { label, data } } = useContext(ChartContext)
    const { info } = useContext(PanelContext)
    const [isRelaseDisable, setReleaseDisable] = useState(true)
    const [isFinishDisable,setFinishDisable] = useState(true)

    useEffect(() =>{
        if(data.length > 0){
            
            setReleaseDisable(info.start_date == null || data.at(0).date > new Date(info.start_date).getTime())
            setFinishDisable(info.end_date == null  || data.at(-1).date < new Date(info.end_date).getTime())
        }
    },[data])
    const [flagOptions, setFlagOptions] = useState({
        defaultRelease: false,
        defaultFinish: false,
        defaultRelationships: true,
    })

    const [allowDuplicate, setAllowDupliace] = useState(true)
    const getChart = () => {

        switch (label) {
            case 'members':
                return <MembersChart info={info} data={data}  />
            case 'score':
                return <ScoreChart data={data}  />
            case 'popularity':
                return <PopularityChart data={data} />
            case 'ranked':
                return <RankedChart data={data}  />
            case 'favorites':
                return <FavoritesChart data={data}  />
            default:
                return <MembersChart dataKey={'members'} data={data} />
        }
    }
    return (
        <CustomOptionsContext.Provider value={{ flagOptions,isRelaseDisable,isFinishDisable ,setFlagOptions,allowDuplicate, setAllowDupliace }}>
            <div className='chart-area'>
                {getChart()}
                <CustomOptions />
            </div>
        </CustomOptionsContext.Provider>
    )

}

export default RenderChart