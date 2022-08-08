
import { useEffect, useState } from 'react';
import './index.css';
const Loading = ({isSearching}) => {
    return (
        <div className='loading'>
            <div className="chat-bubble">
                <div className="typing">
                    <div className={`dot ${isSearching && 'animation'}`}></div>
                    <div className={`dot ${isSearching && 'animation'}`}></div>
                    <div className={`dot ${isSearching && 'animation'}`}></div>
                </div>
            </div>
        </div>
    )

}

export default Loading