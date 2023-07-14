import React from 'react'
import {useLocation} from "react-router-dom"
import { useNavigate } from 'react-router-dom'

import "../App.css"

function Navbar() {
    let location = useLocation();
    let history = useNavigate();
    // useEffect(()=>
    // {
    //    console.log(location)
    // },[location])
  const LogUserout = () =>
  {
    localStorage.removeItem('token');
    history('/');
  }
  return (
    <div>
     {/* <nav className="navbar navbar-expand-lg bs-side-navbar"> */}
     <nav className="navbar navbar-expand-lg"> 
    {/* <a className="navbar-brand" href="/home">i-Notes</a> */}
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <a className={`nav-link ${location.pathname==="/home"?"active":""}`} href="/home">Home</a>
            </li>
            <li className="nav-item">
                <a className={`nav-link ${location.pathname==="/about"?"active":""}`} href="/createnote">Add a note</a>
            </li>
            <a className="mx-2 my-2 logout" href="/" onClick={LogUserout}>Logout</a>
        </ul>
    </div>
</nav>
    </div>
  )
}

export default Navbar
