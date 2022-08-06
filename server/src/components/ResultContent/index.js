
import { useEffect, useState } from 'react';
import './index.css';
const ResultContent = ({content, onLoad}) => {
    const [isLoaded, setLoaded] = useState(false)
    const imgLoaded = (img) =>{
        setLoaded(true)
        onLoad()
    }
    return (
        <div className={`c-container ${isLoaded && 'visible'}`}>
            <img className={`content`} src={content.image_url} onLoad={({target}) => imgLoaded(target)}></img>
            <div className='text year'>{content.payload.start_year}</div>
            <div className='text title'>{content.name.substring(0,50)}</div>


        </div>
    )

}

export default ResultContent