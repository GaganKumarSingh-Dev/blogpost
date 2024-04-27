import React, { useEffect, useState } from 'react'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import { useNavigate } from 'react-router-dom';

const Post = () => {

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
    <div>
      <form onSubmit={addData}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" value={title} placeholder='Enter your text' onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="desc">Description</label>
        <input type="text" id="desc" name="desc" value={desc} placeholder='Enter the post description' onChange={(e) => setDesc(e.target.value)} />
        <button type='submit'>Add Data</button>
      </form>
    </div>
  )
}

export default Post
