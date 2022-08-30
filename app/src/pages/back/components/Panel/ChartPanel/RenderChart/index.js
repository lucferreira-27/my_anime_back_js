import ChartOptions from "../ChartOptions"
import MembersChart from "./MembersChart"
import ScoreChart from "./ScoreChart"
import FavoritesChart from "./ScoreChart"
import RankChart from "./ScoreChart"
import PopularityChart from "./ScoreChart"
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
                return <MembersChart   data={data} options={options} />
            case 'ranked':
                return <MembersChart   data={data} options={options} />
            case 'favorites':
                return <MembersChart   data={data} options={options} />
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