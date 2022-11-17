import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'
import Register from './Register';
export default function Navbar(props) {
  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/"><h3>Noxe</h3></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {props.userData?<>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="movies">Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="tvShow">Tv Show</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="people">People</Link>
            </li>

         </ul>
          </> : ''}

         <ul  className="navbar-nav ms-auto d-flex mb-2 mb-lg-0">
           <li className='nav-item order-lg-first order-last d-flex align-items-center'>
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-soundcloud'></i>
              <i className='fab mx-2 fa-spotify'></i>
           </li>

            {props.userData? <li className="nav-item">
             <span onClick={props.logOut} className="nav-link"> LogOut</span>
           </li>:<>
            <li className="nav-item active">
             <Link className="nav-link" to="login">Login </Link>
           </li>
           <li className="nav-item">
             <Link className="nav-link" to="register">Register</Link>
           </li></>}

         </ul>

      </div>
    </div>
    </nav>
  )
}
