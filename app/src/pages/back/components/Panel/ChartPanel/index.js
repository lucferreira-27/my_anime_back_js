
import './index.css';
import pLimit from 'p-limit';
import useFetch from '../../../../static/hooks/useFetch';
import ProgressBarWayBack from './ProgressBarWayBack';
import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const ChartPanel = ({ selectContent, samples }) => {


    const [isLoadingData, setLoadingData] = useState(false)
    const { post, get, response, loading, error } = useFetch("http://localhost:9000")
    const [progress, setProgress] = useState()
    const [sampleData, setSamplesData] = useState([])
    const [data,setData] = useState([])
    const limit = pLimit(1);
    const renderLineChart = (
        <LineChart width={1150} height={280} data={data} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="name" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
        </LineChart>
    );

    useEffect(() =>{
        const convertSamples = () =>{
            return sampleData.map(({samples,url},index) =>{
               let members = parseInt(samples.members.replaceAll(",",""))
               return {name: members, date: index}
            })
        }
        setData(convertSamples())
        
    },[sampleData])

    const getInfoFromSamples = async () => {
        setLoadingData(true)
        setSamplesData([])
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
                    setSamplesData(tmA)
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
            console.log("New Sample Data", sampleData)
        }
    }, [isLoadingData])

    return (
        <div className='panel-chart'>
            <div className='chart-area'>
                {renderLineChart}
            </div>
            <div className='controllers'>
                <div className='select'>
                   <span>Members </span><span>(50%)</span>
                    <p>100000</p>
                </div>
                <div>
                <span>Score </span><span>(50%)</span>
                    <p>100000</p>
                </div>
                <div>
                <span>Ranked </span><span>(50%)</span>
                    <p>100000</p>
                </div>
                <div>
                <span>Popularity </span><span>(50%)</span>
                    <p>100000</p>
                </div>
                <div>
                <span>Favorites </span><span>(50%)</span>
                    <p>100000</p>
                </div>
            </div>
        </div>

    )

}

export default ChartPanel