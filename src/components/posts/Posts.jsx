import React from 'react'
import './Posts.css'
import { MdDelete } from "react-icons/md";
const Posts = (props) => {
    const { title, desc, id, delDoc } = props

    // const deletePost = (key) => {
    //     console.log(key);
    // }
    return (
        <>
            <div className='latest-posts' onClick={() => {}}>
                <div className='latest-post-desc'>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                </div>
                <div className='delete-post-btn'>
                    <button onClick={() => {delDoc(id)}}><MdDelete size="20px"/></button>
                </div>
            </div>
        </>
    )
}

export default Posts