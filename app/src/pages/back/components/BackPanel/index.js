
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './index.css';
import TargetDetails from './TargetDetails'
import useFetchContent from '../../hooks/useFetchContent';

const BackPanel = ({selectContent}) => {



    return (
        <div>
            <TargetDetails content={selectContent} />
        </div>
    )

}

export default BackPanel