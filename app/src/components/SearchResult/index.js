
import { useState, useEffect } from 'react';
import ResultContent from './ResultContent';
import ImagesLoading from './ImagesLoading';
import './index.css';
const SearchResults = ({ open, onclean, allResults, search, onClick }) => {

    const useImageLoaded = () => {
        const { isSearching } = search
        const [loaded, setLoaded] = useState(false);
        const [imagesNotLoaded, setImagesLoaded] = useState(false)
        const checkImagesLoaded = () => {
            const images = document.querySelectorAll('.img-content');
            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                if (!image.complete) {
                    setImagesLoaded(!imagesNotLoaded)
                    return false
                }
            }
            setLoaded(true);
            return true;
        };

        useEffect(() => {
            const timeout = setTimeout(() => {
                checkImagesLoaded()
            }, 100)

            return () => clearTimeout(timeout)
        }, [imagesNotLoaded])

        useEffect(() => {
            if (!isSearching)
                checkImagesLoaded();
            else
                setLoaded(false)
        }, [isSearching]);
        return loaded;
    };
    const isImgLoaded = useImageLoaded()

    useEffect(() => {
        console.log("Image Loaeded", isImgLoaded)
    }, [isImgLoaded])


    return (
        <div className={`search-results ${open ? "show" : "hide"}`}>
            <p className={`wait-input-message ${open && "hide"}`}>Search New Anime</p>
            {!isImgLoaded && <ImagesLoading/>}
            {open && allResults.slice(0, 5).map(result => <ResultContent content={result} key={result.id} isLoaded={isImgLoaded} onClick={() => onClick({ type: "search-bar", result })} />)}
        </div>
    )

}

export default SearchResults