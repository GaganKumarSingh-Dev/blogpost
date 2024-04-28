import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { context } from '../App';
import { arrayUnion, doc, documentId, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/FirebaseConfig';
import Footer from '../components/footer/Footer';

const Blog = ({ fetchData }) => {
  const params = useParams();

  const value = useContext(context);
  const [posts, setPosts, loggedIn, setLoggedIn, loading, setLoading] = value;

  const document = posts.find((post) => post.id === params.id);

  const [comment, setComment] = useState("");
  const addComment = async () => {
    await updateDoc(doc(db, "posts", document.id), {
      comments: arrayUnion(comment)
    });
    setComment("");
    fetchData();
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <div className='blog-page'>
        <div>
          <h4>Free for all... blogs</h4>
          <h1 className='blog-page-title'>{document.title}</h1>
          <p className='blog-page-desc'>{document.desc}</p>
        </div>
        <div className='comment-section'>
          <div className='comment-area'>
            <h2>Comment</h2>
            <textarea className='comment-text' name="comment" id="comment" value={comment} onChange={(e) => { setComment(e.target.value) }} cols="105" rows="5" ></textarea>
            <button className='comment-btn' onClick={() => addComment()}>Comment</button>
          </div>
          <div className='read-comments'>
            <h2>Read Comments</h2>
            <div className='all-comments'>
              {
                document.comments.map((comment, index) => {
                  return (
                    <div key={index} className='comment'>
                      <p>{comment}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Blog