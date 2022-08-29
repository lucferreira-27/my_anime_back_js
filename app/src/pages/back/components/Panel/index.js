
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import useFetch from '../../../static/hooks/useFetch';
import './index.css';
import TargetPanel from './TargetPanel'
import { PanelContext } from '../../context/PanelContext';
const Panel = ({ selectContent, setSelectContent }) => {

    const { post, get, response, loading, error } = useFetch("http://localhost:9000")
    const { category, id } = useParams()
    const [samples, setSamples] = useState([])
    const [isEmpty, setEmpty] = useState(false)
    const navigate = useNavigate()
    const searchSamples = async ({ start, end, space, period }) => {
        setSamples([])
        const url = selectContent.url
        const {results} = await get(`/wayback/search?url=${url}&start=${start}&end=${end}&space=${space}&period=${period}`)
        if (results.error) {
            return setEmpty(true)
        }
        setSamples(results)
    }
    const getPanelInfo = async () => {
        const url = `https://myanimelist.net/${category}/${id}`
        const res = await post('/samples', { urls: [url] })
        if (!Math.floor(res.status / 100) != 2 || res[0].error) {
            const info = res[0].samples
            info.type = category
            info.id = id
            return info
        }

    }
    useEffect(() => {
        if (samples.length > 0)
            console.log(samples)
    }, [samples])

    useEffect(() => {
        setSamples([])
    }, [selectContent])

    useEffect(() => {
        const loadContent = async () => {
            const info = await getPanelInfo()
            info && setSelectContent(info)
        }
        if (!selectContent) {
            loadContent()
        }
    }, [])

    useEffect(() => {
        if (error)
            navigate("/")
    }, [error])

    return (
        <PanelContext.Provider value={{ searchSamples, samples, loadingSamples: loading }}>
            {
                loading && !selectContent ?
                    <div className='setup-area loading-area'>
                        <div class="loadingio-spinner-rolling-2nyziwg0bch">
                            <div class="ldio-slg5ju7zrpk">
                                <div></div>
                            </div>
                        </div>
                    </div>
                    :
                    <div class={`setup-area ${samples.length > 0 && !loading ? 'expand' : ''}`}>
                        {selectContent && <TargetPanel key={selectContent.id} info={selectContent} />}
                    </div>

            }


        </PanelContext.Provider>

    )

}

export default Panel