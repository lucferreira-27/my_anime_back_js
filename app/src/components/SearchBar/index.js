
import { useEffect, useRef, useState } from 'react';
import './index.css';
import InputLoading from '../SearchResult/InputLoading'
import SearchResults from '../SearchResult'
const SearchBar = ({onClick}) => {
    const [isSearching, setSearching] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [category, setCategory] = useState('anime')
    const [content,setContent] = useState()
    const [hasSearchResults, setSearchResults] = useState(false)
    const handleTermSearch = (event) => {
        setSearchTerm(event.target.value)
    }
    const handleCategory=(e)=>{
        setCategory(e.target.name)
    }
    const textInput = useRef()

    const search = async () =>{
        const url = `http://localhost:9000/search?q=${searchTerm}&category=${category}`
        setSearching(true)
        let response = await fetch(url)
        let json = await response.json()
        setSearching(false)
        setContent(json)
        setSearchResults(true)
    }
    const clearResults = () =>{
        setContent(null)
        setSearchTerm('')
        textInput.current.value = ''
        setSearching(false)
        setSearchResults(false)
    }


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          if(searchTerm.length){
            search()
            return
          }
          clearResults()
          setSearching(false)
        }, 500)
    
        return () => {
            clearTimeout(delayDebounceFn)
        }
      }, [searchTerm,category])

    return (
        <div className='container'>
            <form className='container search-bar'>
                <div className='input-area'>
                    <div className='filters'>
                        <label htmlFor='anime'>Anime</label>
                        <input type={"radio"} name={'anime'} checked={category === 'anime' && 'checked'} onChange={e => handleCategory(e)}/>
                        <label htmlFor='manga'>Manga</label>
                        <input type={"radio"} name={'manga'} checked={category === 'manga' && 'checked'} onChange={e => handleCategory(e)}/>
                    </div>
                    <span className='search-bar-area'>
                        <input type={'text'} ref={textInput} onChange={e => handleTermSearch(e)} />
                        <InputLoading isSearching={isSearching}/>
                    </span>
                </div>
                <SearchResults open={hasSearchResults} onclean = {clearResults} allResults= {content} search = {{isSearching,setSearching}} onClick= {() => console.log("click")}/>
               {/* {(content) && <SearchResults isSearching = {isSearching} setSearching= {setSearching} contents = {content.slice(0,5)} onClick={(selectContent) => onClickSearchResult(selectContent)}/>} */}
            </form>

        </div>
    )

}

export default SearchBar