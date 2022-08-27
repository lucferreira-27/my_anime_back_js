
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import TargetDetails from './TargetDetails'
import ChartPanel from '../ChartPanel';
import { PanelContext } from '../../../context/PanelContext';
import './index.css';


const TargetPanel = ({info}) => {
    
    const {samples} = useContext(PanelContext)

    const style = {
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${info.image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }

    return (
        <div class="setup-info" style={style}>
            {info && <TargetDetails info={info} />}
            
        </div>
    )

}

export default TargetPanel