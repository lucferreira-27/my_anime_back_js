
import './index.css';
const Loading = ({ category }) => {
    const formartCategory = (category) =>{
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
    return (
        <div className='loading-area'>
            <span class="lds-dual-ring" />
            <p>Fetching {formartCategory(category)} Statistics</p>

        </div>
    )

}

export default Loading