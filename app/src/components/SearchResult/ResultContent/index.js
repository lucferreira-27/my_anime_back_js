
import { useEffect, useState } from 'react';
import './index.css';
const ResultContent = ({ content, isLoaded, onClick }) => {


    return (

        <div className={`c-container ${isLoaded && 'visible'}`} onClick={onClick}>
            <img className={`img-content`} src={content.image_url}></img>
            <div className='info year'>{content.payload.start_year}</div>
            <div className='info title'>{content.name.substring(0, 50)}</div>
        </div>
    )

}

export default ResultContent