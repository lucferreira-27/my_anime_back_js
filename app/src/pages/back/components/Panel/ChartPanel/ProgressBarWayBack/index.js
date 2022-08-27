
import { useState } from 'react';
import './index.css';
const ProgressBarWayBack = ({ progress, responseData, requestData }) => {



    return (
        <div className={`progress ${progress >= 1 ? 'hide' : ''}`} >
            <div className='progress-bar'>
                <span style={{ width: `${Math.floor(progress * 100)}%` }} />
            </div>
            <div className='progress-label'>
                <p>{`${responseData.length}/${requestData.length}`}</p>
            </div>
        </div>

    )

}

export default ProgressBarWayBack