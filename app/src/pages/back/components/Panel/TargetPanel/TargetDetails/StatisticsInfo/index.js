
import { useEffect, useState } from 'react';
import './index.css';

const StatisticsInfo = ({ url, info }) => {

    return (
            <div className='infos'>
                <a class="mal-link" href={url} target="_blank">MyAnimeList</a>
                <div className='score'>
                    <span>Score</span>
                    <p>{info.scoreValue}</p>
                    <span>{info.scoreCount} Users</span>
                </div>
                <div className='members'>
                    <span>Members</span>
                    <p>{info.members}</p>
                </div>
                <div className='ranks'>
                    <div className='r-score'>
                        <p>Ranked  <span>{info.ranked}</span></p>
                    </div>
                    <div className='r-popularity'>
                        <p>Popularity <span>{info.popularity}</span></p>
                    </div>
                </div>
            </div>

    )

}

export default StatisticsInfo