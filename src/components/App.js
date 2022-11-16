import { Component, useEffect, useState } from "react";
import {Routes ,Route, useNavigate, Navigate } from 'react-router-dom'
import Notfount from './Notfount';
import Home from './Home';
import Movies from './Movies';
import People from './People';
import Tv from './Tv';
import Navbar from './Navbar';
import Footer from './Footer';
import React from 'react'
import Login from './Login';
import Register from './Register';
import jwtDecode from "jwt-decode";



export default function App() {

  let navigate = useNavigate()

  const [userData,setUserData] = useState(null)


  function getUserData(){
    const dataEncoded = localStorage.getItem('userToken')
    const dataDecoded = jwtDecode(dataEncoded)
    setUserData(dataDecoded)
    console.log(dataDecoded)
  }


  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      getUserData()
    }
  },[])

  function logOut(){
    setUserData(null)
    localStorage.removeItem('userToken')
    navigate('/login')
  }

  function ProtectedRoute(props){
    if(localStorage.getItem('userToken') === null){
      return  <Navigate to='/login'/>
    }else{
      return props.children
    }
  }
  return (
    <>
    <Navbar userData={userData} logOut={logOut}/>
    <div className="container-fluid">
          <Routes>
              <Route  path='/'  element={<ProtectedRoute><Home/></ProtectedRoute>}/>
              <Route  path='home'  element={<ProtectedRoute><Home/></ProtectedRoute>} />
              <Route  path='movies'  element={<ProtectedRoute><Movies/></ProtectedRoute>}/>
              <Route  path='people'  element={<ProtectedRoute><People/></ProtectedRoute>}/>
              <Route  path='tv'  element={<ProtectedRoute><Tv/></ProtectedRoute>}/>
              <Route  path='login'  element={<Login getUserData={getUserData}/>}/>
              <Route  path='register'  element={<Register/>}/>
              <Route  path='*'  element={<Notfount/>}/>
          </Routes>
        </div>
      <Footer/>
    </>
  )
}



