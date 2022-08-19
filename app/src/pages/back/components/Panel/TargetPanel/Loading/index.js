
import './index.css';
const Loading = ({message}) => {

    return (
        <>
            <div className='loading-area'>
                <span class="lds-dual-ring" />
                {message && <p>{message}</p>}
            </div>
        </>

    )

}

export default Loading