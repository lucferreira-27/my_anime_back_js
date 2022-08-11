
import { useEffect, useState } from 'react';
import './index.css';
import Loading from './Loading'
import BackSetup from './BackSetup'

const BackConfig = ({ selectContent }) => {

    const [isFechting, setFechting] = useState(true)

    useEffect(() => {
        setFechting(true)
    }, [selectContent])

    return (
        <div>
            <BackSetup content={selectContent || selectContent} fetch={{ isFechting, setFechting }} />
        </div>
    )

}

export default BackConfig