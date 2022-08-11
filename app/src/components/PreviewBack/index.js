
import './index.css';
import { BiUpArrowAlt,BiDownArrowAlt } from 'react-icons/bi';

const PreviewBack = ({ back,onClick }) => {
    const backStyle = {
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${back.title.image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }
    const maxTitleFontSize = () =>{
        
        if(back.title.name.length > 40){
            return {fontSize: 12}
        }

        if(back.title.name.length > 30){
            return {fontSize: 14}
        }
        return {fontSize: 18}
    }
    const formatDates = (back) =>{
        
        let {start_date,end_date} = back
        let d1 = start_date.split('T')[0].replaceAll("-","/")
        let d2 = end_date.split('T')[0].replaceAll("-","/")
        return `${d1} - ${d2}`

    }
    const getInfos = () =>{
       // const templates =["Members: {000,}", "Score: {0.} - ({000,})", "Ranked: #", "Popularity: # {000,}", "Favorites: {000,}"]
        const infos  = []
        const getRate = (rate) =>{
            const formatedRate = rate < 1 ? `${Math.abs(rate) * 100}%` : `#${rate}`
            if(rate >= 0)
                return <span className='rate-positive '><BiUpArrowAlt />{formatedRate}</span>
            return <span className='rate-negative '><BiDownArrowAlt />{formatedRate}</span>
        }
        infos.push( <li>{`Members: ${back.title.members}`} {getRate(back.rate.members_rate)}</li>)
        infos.push( <li>{`Score: ${back.title.score} - (${back.title.score_users})`} {getRate(back.rate.score_rate)}</li>)
        infos.push( <li>{`Ranked: #${back.title.ranked_position}`} {getRate(back.rate.ranked_position_rate)}</li>)
        infos.push( <li>{`Popularity: #${back.title.popularity_position}`} {getRate(back.rate.popularity_position_rate)}</li>)
        infos.push( <li>{`Favorites: ${back.title.favorites}`} {getRate(back.rate.favorites_rate)}</li>)
        return infos
    }

    return (
        <div className="back" style={backStyle}>
            <div className='preview-container'>
                <img className='preview-img' src={back.title.image_url} />
                <div className="preview-content">
                    <h4 className='p-title' style={maxTitleFontSize()}>{back.title.name}</h4>
                    <p className='p-date'>{formatDates(back)}</p>
                    <a className='mal-link' href={back.title.mal_url} target="_blank">MyAnimeList</a>
                    <ul className='info'>
                        {getInfos()}
                    </ul>
                    <a className='show-more' onClick={() => onClick({type:"recent-back",content:{back}})}>Show More</a>
                </div>
            </div>

        </div>

    )

}

export default PreviewBack