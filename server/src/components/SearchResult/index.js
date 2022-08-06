
import { useState, useEffect } from 'react';
import ResultContent from '../ResultContent';
import './index.css';
const SearchResults = ({contents,setSearching}) => {

    const [loadedImages, setLoadedImages]=  useState([])
    return (
        <div className='search-results'>
               {contents.map(content => <ResultContent content={content} key={content.id} onLoad={() => setSearching(false)}/>)}
        </div>
    )

}

export default SearchResults