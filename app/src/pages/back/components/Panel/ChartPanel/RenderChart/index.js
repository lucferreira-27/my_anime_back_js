import ChartOptions from "../ChartOptions"
import MembersChart from "./MembersChart"
import ScoreChart from "./ScoreChart"
import FavoritesChart from "./FavoritesChart"
import RankedChart from "./RankedChart"
import PopularityChart from "./PopularityChart"
import { ChartContext } from "../../../../context/ChartContext"
import {useContext, useEffect, useState } from "react"

const RenderChart = (options) => {
    const {activeController:{label,data}} = useContext(ChartContext)

    const getChart = () => {
        
        switch (label) {
            case 'members':
                return <MembersChart   data={data} options={options} />
            case 'score':
                return <ScoreChart  data={data} options={options} />
            case 'popularity':
                return <PopularityChart   data={data} options={options} />
            case 'ranked':
                return <RankedChart   data={data} options={options} />
            case 'favorites':
                return <FavoritesChart   data={data} options={options} />
            default:
                return <MembersChart  dataKey={'members'} data={data} options={options} />
        }
    }
    return (
        <div className='chart-area'>
            {getChart()}
            <ChartOptions />
        </div>
    )

}

export default RenderChart