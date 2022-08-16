
import { useEffect, useState, useTransition } from 'react';
import './index.css';
const ResultContent = ({ content, isLoaded, cacheImg ,onClick }) => {
    
    const useTimeout = (check,timeout=100,update) =>{
        const [isVisible,setVisible] = useState(false)
        useEffect(() =>{
            setTimeout(() => {
                if(check()){
                    setVisible(true)
                }
            }, timeout);
        },[update])
        return isVisible
    }
    
    const isVisible = useTimeout(() => isLoaded,10,[isLoaded])

    return (

        <div className={`c-container ${isVisible && 'visible'} ${isVisible && !cacheImg && `delay`} ${!isLoaded && 'hide'}`} onClick={onClick}>
            <img className={`img-content`} src={content.image_url} ></img>
            <div className='info year'>{content.payload.start_year}</div>
            <div className='info title'>{content.name.substring(0, 50)}</div>
        </div>
    )

}

export default ResultContent