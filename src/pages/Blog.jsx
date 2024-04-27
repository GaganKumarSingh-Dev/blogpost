import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { context } from '../App';

const Blog = () => {
  const params = useParams();

  const value = useContext(context);
  const [posts, loggedIn ] = value;

  const document = posts.find((post) => post.id === params.id);

  return (
    <div className='blog-page'>
        <h4>Free for all... blogs</h4>
        <h1 className='blog-page-title'>{document.title}</h1>
        <p  className='blog-page-desc'>{document.desc}</p>
    </div>
  )
}

export default Blog