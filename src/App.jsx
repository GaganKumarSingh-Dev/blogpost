import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import Post from './pages/Post'
import Blog from './pages/Blog'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { createContext, useState } from 'react'

const context  = createContext();

function App() {

  const [posts, setPosts] = useState(localStorage.getItem('postsArray') ? JSON.parse(localStorage.getItem('postsArray')) : []);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <context.Provider value={[posts, setPosts, loggedIn, setLoggedIn]}>
    <div className='container'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Post />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
    </context.Provider>
  )
}

export default App
export {context}
