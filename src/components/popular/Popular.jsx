import React from 'react'

const Popular = (props) => {
    const { title, desc } = props
    return (
        <>
            <div className='popular-div'>
                <h3>{title}</h3>
                <p>{desc}</p>
            </div>
        </>
    )
}

export default Popular