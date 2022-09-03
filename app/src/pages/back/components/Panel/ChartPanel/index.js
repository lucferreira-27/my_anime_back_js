
import './index.css';
import pLimit from 'p-limit';
import useFetch from '../../../../static/hooks/useFetch';
import ProgressBarWayBack from './ProgressBarWayBack';
import RenderChart from './RenderChart';
import ChartController from './ChartController';
import ChartOptions from './ChartOptions'
import { ChartContext } from '../../../context/ChartContext';
import { PanelContext } from '../../../context/PanelContext';
import { useEffect, useState,useContext } from 'react';
const ChartPanel = () => {

    const { searchSamples, isChartOpen,samples ,setChartOpen,loadingSamples,isNewSamples, setNewSamples } = useContext(PanelContext)

    const [isLoadingData, setLoadingData] = useState(false)
    const { post } = useFetch("http://localhost:9000")
    const [progress, setProgress] = useState()
    const [responseSamples, setResponseSamples] = useState([])
    const [allData, setAllData] = useState([])
    const [controllers, setControllers] = useState({ active: null, all: allData })

    const limit = pLimit(1);

    useEffect(() => {
        const convertToController = () => {
            const allDatas = responseSamples.filter(data => data.samples).map(({ samples, timestamp }, index) => {
                let members = parseInt(samples.members.replaceAll(",", ""))
                let score = parseFloat(samples.score).toFixed(2)
                let popularity = parseInt(samples.popularity)
                let ranked = parseInt(samples.ranked)
                let favorites = samples.favorites ? parseInt(samples.favorites.replaceAll(",", "")) : null
                let score_users = parseInt(samples.score_users)
                return { date: timestamp, members, score, popularity, ranked, favorites, score_users }
            })
            setAllData(allDatas)
        }
        convertToController()
    }, [responseSamples])
    useEffect(() => {
        const createControllers = () => {
            const rates = (contents) => {
                const getValue = (contents, position) =>{
                    for(let content of position == 1 ? contents : [...contents].reverse()){
                        if(content.value > 0){
                            return content.value
                        }
                    }
                }
                let firstValue = getValue(contents, 1)
                let lastValue = getValue(contents, -1)
                console.log(firstValue,lastValue)
                let amount = lastValue * 100
                let diff = amount / firstValue
                return {
                    currentValue: lastValue,
                    increaseValue: (lastValue - firstValue).toFixed(2),
                    increase: diff > 100,
                    porcentage: diff - 100
                }
            }
            const controllerTypes = ["members", "score", "popularity", "ranked", "favorites"]
            const allControllers = controllerTypes.map((label) => {
                let data = allData.reduce((prev, current) => {
                    return [...prev, { value: current[label], date: current.date }]
                }, [])
                return { label, data, ...rates(data) }
            })
            setControllers({ ...controllers, active: allControllers[0], all: allControllers })
        }
        if (progress == 1) {
            createControllers()
            setProgress(0)
        }
    }, [allData])

    useEffect(() => {
        console.log("Progress: " + progress)

    }, [progress])


    const getInfoFromSamples = async () => {
        setLoadingData(true)
        setResponseSamples([])
        const waybackUrls = []
        const urls = samples.map(sample => sample.waybackUrl)
        while (urls.length > 0) {
            waybackUrls.push(urls.splice(0, 5));
        }

        let current = 0
        let tmA = []

        const fetchs = waybackUrls.map((urls) => {
            return limit(() => {
                return post('/samples', { urls }).then((response) => {

                    tmA = [...tmA, ...response]
                    setResponseSamples(tmA)
                    current += urls.length
                    console.log(`[Download Samples Progress] ${current}/${samples.length}`);
                    setProgress(current / samples.length)
                })
            })
        })
        await Promise.all(fetchs)
        setLoadingData(false)
        setNewSamples(false)
    }

    useEffect(() => {

        if(isNewSamples && !isLoadingData && samples.length > 0){
            getInfoFromSamples()
        }
    }, [samples])


    const dataLoaded = (isLoadingData) => {
        if (isLoadingData) {
            return (
                <ProgressBarWayBack progress={progress} responseData={responseSamples} requestData={samples} />
            )
        }
        return (<>
            <ChartController controllers={controllers.all} />
        </>)
    }



    return (
        <>
            {isChartOpen && <ChartContext.Provider value={{
                activeController: controllers.active || { label: '', data: allData },
                setActiveController: (active) => setControllers({ ...controllers, active })
            }}>
                <div className='panel-chart'>
                    <RenderChart />
                    {dataLoaded(isLoadingData)}
                </div>
            </ChartContext.Provider>}
        </>

    )

}

export default ChartPanel