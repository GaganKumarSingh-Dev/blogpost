import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import Post from './pages/Post'
import Blog from './pages/Blog'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { createContext, useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase/FirebaseConfig'

const context = createContext();

function App() {

  const [posts, setPosts] = useState(localStorage.getItem('postsArray') ? JSON.parse(localStorage.getItem('postsArray')) : []);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noOfPosts, setNoOfPosts] = useState(4);

  const postsRef = collection(db, "posts");

  async function fetchData() {
    if (posts.length < noOfPosts || posts.length < 10) {
      const getPostsFromFirebase = [];

      const querySnapshot = await getDocs(postsRef);
      querySnapshot.forEach((doc) => {
        getPostsFromFirebase.push({ ...doc.data(), id: doc.id });
      });
      setPosts(getPostsFromFirebase);
      localStorage.setItem('postsArray', JSON.stringify(getPostsFromFirebase));
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, [Blog]);

  return (
    <context.Provider value={[posts, setPosts, loggedIn, setLoggedIn, loading, setLoading, noOfPosts, setNoOfPosts]}>
      <div className='container'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Post />} />
          <Route path='/blog/:id' element={<Blog fetchData={fetchData} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </context.Provider>
  )
}

export default App
export { context }
