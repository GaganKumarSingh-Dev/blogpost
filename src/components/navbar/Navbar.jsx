import React, { useState } from 'react'
import './Navbar.css'
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';


const Navbar = () => {

  const [search, setSearch] = useState('')

  return (
    <div className='navbar'>
      <h2>BlogPost.</h2>

      <div className='search-box'>
        <button><Link to="/post">Create Post <span>+</span></Link></button>
      </div>
    </div>
  )
}

export default Navbar