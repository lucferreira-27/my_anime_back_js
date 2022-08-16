
import './index.css';
import { useEffect, useState } from 'react';
import PreviewBack from './PreviewBack';

const RecentsBacks = ({onClickContent}) => {

    const [previewBacks, setPreviewBacks] = useState([])

    useEffect(() => {
        const getPreviewBacks = async () => {
            const url = ` http://localhost:9000/backs/`
            let response = await fetch(url)
            let backs = await response.json()
            setPreviewBacks([...backs])
        }
        getPreviewBacks()
    }, [])
    return (
        <>
            <div className='sign'>
                <h3>Recents Backs</h3>
            </div>
            <div className="preview-backs">
                {previewBacks && previewBacks.map((back,index) => <PreviewBack key={index} back={back} onClick={(content) => onClickContent(content)}/>)}
            </div>
        </>

    )

}

export default RecentsBacks