
import '../../index.css'

const RelantionshipOptions = ({ label }) => {

    return (

        <>
            <div className='relationships'>
                <div className="flag">
                    <span className="flag-type">
                        New Anime, 2013
                    </span>
                    <label class="switch">
                        <input type="checkbox" name='finish' />
                        <span class="slider round"></span>
                    </label>
                </div>
                <div className="flag">
                    <span className="flag-type">
                        New Anime, 2013/1
                    </span>
                    <label class="switch">
                        <input type="checkbox" name='finish' />
                        <span class="slider round"></span>
                    </label>
                </div>
                <div className="flag">
                    <span className="flag-type">
                        New Anime, 2013/2
                    </span>
                    <label class="switch">
                        <input type="checkbox" name='finish' />
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>


        </>
    )
}

export default RelantionshipOptions