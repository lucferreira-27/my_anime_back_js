
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import TargetDetails from './TargetDetails'

const TargetPanel = ({content}) => {
    

    const style = {
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${content.image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }

    return (
        <div class="setup-info" style={style}>
            {content && <TargetDetails content={content} />}
        </div>
    )

}

export default TargetPanel