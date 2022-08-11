
import { useEffect, useRef, useState } from 'react';
import './index.css';
import Loading from '../Loading'
import SearchResults from '../SearchResult'
const SearchBar = ({onClick}) => {
    const [isSearching, setSearching] = useState(false)
    const [searchTerm, setTxtSearch] = useState('')
    const [category, setCategory] = useState('anime')
    const [content,setContent] = useState()
    const handleTermSearch = (event) => {
        setTxtSearch(event.target.value)
    }
    const handleCategory=(e)=>{
        setCategory(e.target.name)
    }
    const textInput = useRef()

    const search = async () =>{
        console.log(searchTerm)
        const url = `http://localhost:9000/search?q=${searchTerm}&category=${category}`
        setSearching(true)
        let response = await fetch(url)
        let json = await response.json()
        setContent(json)
    }
    const clearResults = (selectContent) =>{
        setContent(null)
        setTxtSearch('')
        textInput.current.value = ''
        setSearching(false)
        onClick(selectContent)
    }



    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          if(searchTerm.length){
            search()
            return
          } 
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
                        <Loading isSearching={isSearching}/>
                    </span>
                </div>
                {(content) && <SearchResults isSearching = {isSearching} setSearching= {setSearching} contents = {content.slice(0,5)} onClick={(selectContent) => clearResults(selectContent)}/>} 
            </form>

        </div>
    )

}

export default SearchBar