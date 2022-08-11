
import { useEffect, useState } from 'react';
import './index.css';
import Loading from '../Loading'
import StatisticsInfo from '../StatisticsInfo'
const BackSetup = ({ content, fetch: { isFechting, setFechting } }) => {

    const [info, setInfo] = useState({})
    const [isLoading, setLoading] = useState(false)
    const backStyle = {
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${content.image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }

    useEffect(() => {
        const getStatistics = async () => {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "urls": [content.url] })
            };
            fetch('http://localhost:9000/statistics/', options)
                .then(response => response.json())
                .then(response => {
                    console.log(response[0].statistics)
                    setInfo(response[0].statistics)
                    setFechting(false)
                    setLoading(false)
                })
                .catch(err => console.error(err));
        }
        if (!isLoading) {
            setLoading(true)
            getStatistics()
        }
    }, [isFechting])
    const formatSimpleInfo = () => {
        let {start_year, media_type, status} = content
        let siglas_types = ["TV","OVA","ONA"]
        return (
            <p>{start_year}
                <span> | {siglas_types.includes(media_type) ? media_type : media_type.toLowerCase()}</span>
                {media_type != 'Movie' && <span> | {content.status.toLowerCase()}</span>}
            </p>
        )

    }
    return (
        <div class="setup-area">
            <div class="setup-info" style={backStyle}>
                <div class="setup-content">
                    <div className='simple-info'>
                        <img className='setup-img' src={content.image_url}></img>
                        {formatSimpleInfo()}
                    </div>
                    <div className='statistics-area'>
                        <h4>{content.name}</h4>
                        {isFechting ? <Loading category={content.type || content.back.title.type} /> : <StatisticsInfo url={content.url} info={info} />}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default BackSetup