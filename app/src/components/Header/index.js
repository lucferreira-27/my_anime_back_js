
import './index.css';
const Header = ({onClick}) =>{
    return (
        <header>
            <div className='main-header'>
                <h1 className="logo"><span onClick={() => onClick(true)}>MyAnime<span className='back'>Back</span></span></h1>
            </div>
        </header>
    )

}

export default Header