
import { useEffect, useState } from 'react';
import './index.css';
const Loading = ({isSearching}) => {
    return (
        <div className='loading'>
            <div class="chat-bubble">
                <div class="typing">
                    <div class={`dot ${isSearching && 'animation'}`}></div>
                    <div class={`dot ${isSearching && 'animation'}`}></div>
                    <div class={`dot ${isSearching && 'animation'}`}></div>
                </div>
            </div>
        </div>
    )

}

export default Loading