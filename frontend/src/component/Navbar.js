import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  return (
    <>
    <header>
        <div className='logo'>
           <h1>Book Store</h1> 
        </div>
        <nav>
        <ul>
            <li><Link to="/">About</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
        </ul>
        </nav>
    </header>
    </>
  )
}
