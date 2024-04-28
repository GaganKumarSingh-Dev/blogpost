import React, {useContext} from 'react'
import './Posts.css'
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { context } from '../../App';

const Posts = (props) => {
    const { title, desc, id, delDoc } = props;
    const navigate = useNavigate();

    const value = useContext(context);
    const [posts, setPosts, loggedIn, setLoggedIn] = value;
    const description = desc;

    return (
        <>
            <div className='latest-posts' onClick={() => {navigate(`/blog/${id}`)}}>
                <div className='latest-post-desc'>
                    <h3>{title}</h3>
                    <p>{description.slice(0, 190)}...</p>
                </div>
                {loggedIn && 
                <div className='delete-post-btn'>
                    <button onClick={() => {delDoc(id)}}><MdDelete size="20px"/></button>
                </div>}
            </div>
        </>
    )
}

export default Posts