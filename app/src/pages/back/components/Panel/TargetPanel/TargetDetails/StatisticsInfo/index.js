
import { useEffect, useState } from 'react';
import './index.css';

const StatisticsInfo = ({ info }) => {
    console.log(info)
    return (
            <div className='infos'>
                <a class="mal-link" href={info.url} target="_blank">MyAnimeList</a>
                <div className='score'>
                    <span>Score</span>
                    <p>{info.score}</p>
                    <span>{info.score_users} Users</span>
                </div>
                <div className='members'>
                    <span>Members</span>
                    <p>{info.members}</p>
                </div>
                <div className='ranks'>
                    <div className='r-score'>
                        <p>Ranked  <span>{`#${info.ranked}`}</span></p>
                    </div>
                    <div className='r-popularity'>
                        <p>Popularity <span>{`#${info.popularity}`}</span></p>
                    </div>
                </div>
            </div>

    )

}

export default StatisticsInfo