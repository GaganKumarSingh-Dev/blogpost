import React, { useContext, useState } from 'react'
import './Navbar.css'
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { context } from '../../App';


const Navbar = () => {

  const [search, setSearch] = useState('')
  const navigate = useNavigate();

  const value = useContext(context);
  const [posts, setPosts, loggedIn, setLoggedIn] = value;

  return (
    <div className='navbar'>
      <h2 onClick={() => navigate("/")}>BlogPost.</h2>
      <div className='search-box'>
        {
        loggedIn ?
         (<button onClick={() => navigate("/create")}>Create Post <span>+</span></button>)
          : (<button onClick={() => navigate("/login")}>Create Post <span>+</span></button>)
        }
      </div>
    </div>
  )
}

export default Navbar