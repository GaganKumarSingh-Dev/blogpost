import React, { useEffect, useState } from 'react'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer/Footer';

const Post = () => {

  // Create a post

  const postsRef = collection(db, "posts");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();

  const addData = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(postsRef, {
        title: title,
        desc: desc,
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
      setDesc("");
      navigate('/');

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return (
    <div className='create-post'>
      <div className='create-card'>
        <span className="create-title">Create a post</span>
        <form onSubmit={addData} className='create-form'>
          <div className="create-group">
            <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <label htmlFor="title">Title</label>
          </div>
          <div className="create-group">
            <textarea rows={5} type="text" id="desc" name="desc" value={desc} onChange={(e) => setDesc(e.target.value)} required />
            <label htmlFor="desc">Description</label>
          </div>
          <button type='submit'>Add Data</button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Post
