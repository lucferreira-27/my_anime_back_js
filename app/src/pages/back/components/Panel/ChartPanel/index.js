
import './index.css';
import pLimit from 'p-limit';
import useFetch from '../../../../static/hooks/useFetch';
import ProgressBarWayBack from './ProgressBarWayBack';
import RenderChart from './RenderChart';
import ChartController from './ChartController';
import ChartOptions from './ChartOptions'
import { ChartContext } from '../../../context/ChartContext';
import { useEffect, useState } from 'react';
const ChartPanel = ({ selectContent, samples }) => {

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
                let favorites = parseInt(samples.favorites.replaceAll(",", ""))
                let score_users = parseInt(samples.score_users)
                return { date: timestamp, members, score, popularity, ranked, favorites, score_users }
            })
            setAllData(allDatas)
        }
        convertToController()
    }, [responseSamples])

    useEffect(() => {
        const createControllers = () => {
            const rates = (content) => {
                let fistValue = content[0].value
                let lastValue = content[content.length - 1].value
                let amount = lastValue * 100
                let diff = amount / fistValue
                return {
                    currentValue: lastValue,
                    increaseValue: (lastValue - fistValue).toFixed(2),
                    increase: diff > 100,
                    porcentage: diff - 100
                }
            }
            const controllerTypes = ["members", "score", "popularity", "ranked", "favorites"]
            const allControllers = controllerTypes.map((label) => {
                let data = allData.reduce((prev, current) => {
                    return [...prev, {value: current[label], date:current.date}]
                }, [])
                return { label, data, ...rates(data) }
            })
            setControllers({ ...controllers, active: allControllers[0] ,all: allControllers })
        }
        if (progress == 1) {
            createControllers()
        }
    }, [allData])


    const getInfoFromSamples = async () => {
        setLoadingData(true)
        setResponseSamples([])
        const waybackUrls = []
        const urls = samples.map(sample => sample.waybackUrl)
        while (urls.length > 0) {
            waybackUrls.push(urls.splice(0, 5));
        }
        console.log(waybackUrls)
        let current = 0
        let tmA = []

        const fetchs = waybackUrls.map((urls) => {
            return limit(() => {
                return post('/samples', { urls }).then((response) => {
                    tmA = [...tmA, ...response]
                    setResponseSamples(tmA)
                    current += urls.length
                    console.log(`${current}/${samples.length}`);
                    setProgress(current / samples.length)
                })
            })
        })
        await Promise.all(fetchs)
        setLoadingData(false)
    }


    useEffect(() => {
        if (!isLoadingData) {
             getInfoFromSamples()
        }
    }, [])

    useEffect(() => {
        if (!isLoadingData) {
            console.log("All Samples Data Collect!")
            console.log("New Sample Data", allData)
        }
    }, [isLoadingData])

    const dataLoaded = (isLoadingData) => {
        if(isLoadingData){
            return(
                <ProgressBarWayBack progress={progress} responseData={responseSamples} requestData={samples}/>
            )
        }
        return (<>
            <ChartController controllers={controllers.all} />
        </>)
    }



    return (
        <ChartContext.Provider value={{
            activeController: controllers.active || {label: '', data:allData},
            setActiveController: (active) => setControllers({ ...controllers, active })
        }}>
            <div className='panel-chart'>
                <RenderChart />
                {dataLoaded(isLoadingData)}
            </div>
        </ChartContext.Provider>
    )

}

export default ChartPanel