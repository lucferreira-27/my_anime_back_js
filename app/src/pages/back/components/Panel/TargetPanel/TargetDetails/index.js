
import { useEffect, useState, useContext } from 'react';
import './index.css';
import Loading from '../Loading'
import StatisticsInfo from './StatisticsInfo'
import InputBackInfo from '../InputBackInfo'
import useFetch from '../../../../../static/hooks/useFetch';
import { PanelContext } from '../../../../context/PanelContext';

const TargetDetails = ({ content }) => {

    const {getSamples} = useContext(PanelContext)

    const { post, response, loading, error } = useFetch("http://localhost:9000")
    const [info, setInfo] = useState(null)

    async function getInfoDetails() {
        const response = await post('/statistics', { urls: [content.url] })
        const info = response[0].statistics
        setInfo(info)
    }

    useEffect(() => {
        getInfoDetails()
    }, [content])


    const formatSimpleInfo = () => {
        let { start_year, media_type, status } = content
        let siglas_types = ["TV", "OVA", "ONA"]
        return (
            <p>{start_year}
                <span> | {siglas_types.includes(media_type) ? media_type : media_type.toLowerCase()}</span>
                {media_type != 'Movie' && <span> | {status.toLowerCase()}</span>}
            </p>
        )

    }

    useEffect(() => {
        console.log(loading, error, (loading || !info))
    }, [loading, error])

    const showBackInfo = () => {
        return (<>
            <StatisticsInfo info={info} />
            <InputBackInfo onFormClick={(values) => getSamples(values)} />
        </>)
    }
    return (

        <div class="setup-content">
            <div className='simple-info'>
                <img className='setup-img' src={content.image_url}></img>
                {formatSimpleInfo()}
            </div>
            <div className='statistics-area'>
                <h4>{content.name}</h4>
                {loading || !info ? <Loading error={error} category={content.type || content.back.title.type} /> : showBackInfo()}
            </div>
        </div>
    )

}

export default TargetDetails