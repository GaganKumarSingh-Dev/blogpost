import React, { useState } from 'react'
import './Navbar.css'
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

  const [search, setSearch] = useState('')
  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <h2 onClick={() => navigate("/")}>BlogPost.</h2>

      <div className='search-box'>
        <button onClick={() => navigate("/create")}>Create Post <span>+</span></button>
      </div>
    </div>
  )
}

export default Navbar