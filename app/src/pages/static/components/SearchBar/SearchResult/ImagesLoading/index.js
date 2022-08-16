
import './index.css';
const ImagesLoading = (show=true) => {
    return (
        <>
            {show && <div class="images-loading"><div></div><div></div><div></div></div>}
        </>
    )
}

export default ImagesLoading