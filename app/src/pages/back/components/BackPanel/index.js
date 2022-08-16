
import { useEffect, useState } from 'react';
import './index.css';
import TargetDetails from './TargetDetails'

const BackPanel = ({ selectContent }) => {

    const [isFechting, setFechting] = useState(true)

    useEffect(() => {
        setFechting(true)
    }, [selectContent])

    return (
        <div>
            <TargetDetails content={selectContent || selectContent} fetch={{ isFechting, setFechting }} />
        </div>
    )

}

export default BackPanel