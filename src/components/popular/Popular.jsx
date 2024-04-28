import React from 'react'
import { useNavigate } from 'react-router-dom';

const Popular = (props) => {
    const { title, desc, id } = props
    const navigate = useNavigate();
    const description = desc;
    return (
        <>
            <div className='popular-div' onClick={() => {navigate(`/blog/${id}`)}}>
                <h3>{title}</h3>
                <p>{description.slice(0, 60)}...</p>
            </div>
        </>
    )
}

export default Popular