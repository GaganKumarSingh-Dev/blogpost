import React from 'react'
import './Posts.css'
import { MdDelete } from "react-icons/md";
const Posts = (props) => {
    const { title, desc } = props
    return (
        <>
            <div className='latest-posts'>
                <div className='latest-post-desc'>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                </div>
                <div className='delete-post-btn'>
                    <button><MdDelete size="20px"/></button>
                </div>
            </div>
        </>
    )
}

export default Posts