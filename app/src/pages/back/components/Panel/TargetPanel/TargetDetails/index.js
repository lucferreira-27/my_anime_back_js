
import { useEffect, useState, useContext } from 'react';
import './index.css';
import Loading from '../Loading'
import StatisticsInfo from './StatisticsInfo'
import InputBackInfo from '../InputBackInfo'
import useFetch from '../../../../../static/hooks/useFetch';
import { PanelContext } from '../../../../context/PanelContext';

const TargetDetails = ({ info }) => {

    const {searchSamples} = useContext(PanelContext)
    const { post, loading, error } = useFetch("http://localhost:9000")
    const formatSimpleInfo = () => {
        let { start_year, status } = info
        let media_type = info.type || info.media_type
        let siglas_types = ["TV", "OVA", "ONA"]
        return (
            <p>{start_year}
                <span> | {siglas_types.includes(media_type) ? media_type : media_type.toLowerCase()}</span>
                {media_type != 'Movie' && <span> | {status.toLowerCase()}</span>}
            </p>
        )
    }

    useEffect(() =>{
        const getMoreInfos = async () =>{
            const res = await post('/samples', { urls: [info.url] })
            console.log("res",res[0].samples)
            info.score_users = res[0].samples.score_users
            info.ranked = res[0].samples.ranked
            info.popularity = res[0].samples.popularity
            info.members = res[0].samples.members

        }
        if(!info.score_users)
            getMoreInfos()

    },[info])

    const showBackInfo = () => {
        return (<>
            <StatisticsInfo info={info} />
            <InputBackInfo limits={{minStart: "2011-01-01",maxEnd: "2020-01-01"}} onFormClick={(values) => searchSamples(values)} />
        </>)
    }
    return (

        <div class="setup-content">
            <div className='simple-info'>
                <img className='setup-img' src={info.image_url}></img>
                {formatSimpleInfo()}
            </div>
            <div className='statistics-area'>
                <h4>{info.name}</h4>
                {loading || !info ? <Loading error={error} /> : showBackInfo()}
            </div>
        </div>
    )

}

export default TargetDetails