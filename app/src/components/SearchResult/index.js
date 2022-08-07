
import { useState, useEffect } from 'react';
import ResultContent from '../ResultContent';
import './index.css';
const SearchResults = ({contents, isSearching,setSearching}) => {
    const isImageCache = (src) =>{
        let img = new Image()
        img.src = src
        return img.complete
    }
    const onload = () =>{
        const cache = contents.map(content => content.image_url).every((img) => isImageCache(img))
        if(cache){
            if(isSearching)
                setSearching(false)
            else if(!isSearching)
                setSearching(true)
        }
    }
    useEffect(() => {
        const cache = contents.map(content => content.image_url).every((img) => isImageCache(img))
        if(cache && isSearching)
            setSearching(false)
    },[])

    return (
        <div className='search-results'>
               {contents.map(content => <ResultContent content={content} key={content.id} onLoad={() => onload()}/>)}
        </div>
    )

}

export default SearchResults