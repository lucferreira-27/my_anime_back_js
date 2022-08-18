

import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

const useLink = (location) =>{
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate(location, {replace: true}), [navigate]);
    return handleOnClick
}

export default useLink