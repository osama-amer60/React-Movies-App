import { Component, useEffect, useState } from "react";
import {Routes ,Route, useNavigate, Navigate } from 'react-router-dom'
import Notfount from './Notfount';
import Home from './Home';
import Movies from './Movies';
import People from './People';
import Navbar from './Navbar';
import Footer from './Footer';
import React from 'react'
import Login from './Login';
import Register from './Register';
import jwtDecode from "jwt-decode";
import TvShow from "./TvShow";
import MoreDetails from "./MoreDetails";
import InfoContextProvider from "./Store";




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

  function ProtectedRoute({children}){
    if(localStorage.getItem('userToken') === null){
      return  <Navigate to='/login'/>
    }else{
      return children
    }
  }
  return (
    <>

    <InfoContextProvider>
      <Navbar userData={userData} logOut={logOut}/>
          <div className="container">
            <Routes>
                <Route  path='/'  element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                <Route  path='home'  element={<ProtectedRoute><Home/></ProtectedRoute>} />
                <Route  path='movies'  element={<ProtectedRoute><Movies/></ProtectedRoute>}/>
                <Route  path='tvShow'  element={<ProtectedRoute><TvShow/></ProtectedRoute>}/>
                <Route  path='people'  element={<ProtectedRoute><People/></ProtectedRoute>}/>
                <Route  path='moreDetails'  element={<ProtectedRoute><MoreDetails/></ProtectedRoute>}>
                    <Route  path=':type'  element={<ProtectedRoute><MoreDetails/></ProtectedRoute>}>
                        <Route  path=':id'  element={<ProtectedRoute><MoreDetails/></ProtectedRoute>}/>
                    </Route>
                </Route>

                <Route  path='login'  element={<Login getUserData={getUserData}/>}/>              
                <Route  path='register'  element={<Register/>}/>
                <Route  path='*'  element={<Notfount/>}/>
            </Routes>
          </div>
        <Footer/>
      </InfoContextProvider>
    </>
  )
}



