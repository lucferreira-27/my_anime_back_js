
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import useFetch from '../../../static/hooks/useFetch';
import './index.css';
import TargetPanel from './TargetPanel'
import { PanelContext } from '../../context/PanelContext';

const Panel = ({ selectContent }) => {

    const { post, get, loading, error } = useFetch("http://localhost:9000")
    const [samples, setSamples] = useState([])
    const [isEmpty, setEmpty] = useState(false)
    const navigate = useNavigate()
    const getSamples = async ({start,end,space,period}) =>{
        const url = selectContent.url
        const response = await get(`/wayback/search?url=${url}&start=${start}&end=${end}&space=${space}&period=${period}`)
        if(response.error){
            return setEmpty(true)
        }
        setSamples(response)
    }
    useEffect(() =>{
        console.log(samples)
    },[samples])

    useEffect(() =>{
        setSamples([])
    },[selectContent])

    useEffect(() => {
        if (!selectContent) {
            navigate("/")
        }
    })

    return (
        <PanelContext.Provider value={{getSamples, samples, loadingSamples:loading}}>
            <div class={`setup-area ${samples.length > 0 && !loading ? 'expand' : ''}`}>
                {selectContent && <TargetPanel content={selectContent} />}
            </div>
        </PanelContext.Provider>

    )

}

export default Panel