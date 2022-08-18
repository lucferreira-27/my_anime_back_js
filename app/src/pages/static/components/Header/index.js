
import '../style.css';

import React, { useCallback } from 'react';
import useLink from '../../hooks/useLink';


const Header = () => {

    const handleClick = useLink('/')

    return (
        <header>
            <div className='main-header'>
                <h1 className="logo"><span onClick={handleClick}>MyAnime<span className='back'>Back</span></span></h1>
            </div>
        </header>
    )

}

export default Header