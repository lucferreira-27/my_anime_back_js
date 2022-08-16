
import { useState, useEffect, useRef, useContext } from 'react';
import {GoArrowUp} from 'react-icons/go';
import ResultContent from './ResultContent';
import ImagesLoading from './ImagesLoading';
import './index.css';
const SearchResults = ({ open, onclean, allResults, search, onClick }) => {

    const useImageLoaded = () => {
        const { isSearching } = search
        const [loaded, setLoaded] = useState(false);
        const [reloadSignal, setReloadSignal] = useState(false)
        const checkImagesLoaded = () => {
            const images = document.querySelectorAll('.img-content');
            console.log("IMAGE - ",images.length)
            setLoaded(false);
            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                if (!image.complete) {
                    setCacheImg(false)
                    console.log("IMAGE - NO")
                    setReloadSignal(!reloadSignal)
                    return false
                }
            }
            console.log("IMAGE - YES")
            setLoaded(true);
            return true;
        };

        useEffect(() => {
            const timeout = setTimeout(() => {
                checkImagesLoaded()
            }, 100)

            return () => clearTimeout(timeout)
        }, [reloadSignal])
        useEffect(() => {
            if (!isSearching)
                checkImagesLoaded();
            else
                setLoaded(false)
        }, [isSearching]);
        return [loaded, setLoaded];
    };

    const useOnScreen = (ref) => {

        const [isIntersecting, setIntersecting] = useState(false)
      
        const observer = new IntersectionObserver(
          ([entry]) => setIntersecting(entry.isIntersecting)
        )
      
        useEffect(() => {
          observer.observe(ref.current)
          // Remove the observer as soon as the component is unmounted
          return () => { observer.disconnect() }
        }, [])
      
        return isIntersecting
      }
    const refSearchResults = useRef()

    const useTransitionEvent = (target) => {
        const isVisible = useOnScreen(refSearchResults)
        const [isTransitioning, setIsTransitioning] = useState(false);
  
        const onTransitionStart = (event) => {
            if(event.target == event.currentTarget)
                setIsTransitioning(true);
        }

        const onTransitionEnd = (event) => {
            if(event.target == event.currentTarget)
                setIsTransitioning(false);
        }

        useEffect(() => {
            if(!isVisible){
                return
            }
            target.addEventListener('transitionstart', onTransitionStart);
            target.addEventListener('transitionend', onTransitionEnd);
            return () => {
                target.removeEventListener('transitionstart', onTransitionStart);
                target.removeEventListener('transitionend', onTransitionEnd);
            }

        }, [isTransitioning,isVisible]);

        return isTransitioning;
    }
    const isTransitioning = useTransitionEvent(document.querySelector('.search-results'))
    const [cacheImg, setCacheImg] = useState([])
    const [isImgLoaded, setImgLoaded] = useImageLoaded()
    useEffect(() =>{
        setCacheImg(true)
    },[allResults])

    return (
        <div ref={refSearchResults} className={`search-results ${open ? "show" : "hide"}`}>
            <p className={`wait-input-message ${open && "hide"}`}> <GoArrowUp style={{fontSize: 20}} className='arrow-animation'></GoArrowUp>Who is the target?<GoArrowUp className='arrow-animation' style={{fontSize: 20}}></GoArrowUp></p>
            {(!isImgLoaded) && <ImagesLoading />}
            {allResults && allResults.slice(0, 5).map(result => <ResultContent content={result} key={result.id} cacheImg = {cacheImg} isLoaded={isImgLoaded} onClick={() => onClick({ type: "search-bar", value: result })} />)}
        </div>
    )

}

export default SearchResults