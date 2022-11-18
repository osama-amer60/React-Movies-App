import { createContext } from "react";
import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';

export const infoContext =  createContext(0)

export default function InfoContextProvider(props){
    const [trendingMovies,setTrendingMovies] = useState([])
    const [trendingTv,setTrendingTv] = useState([])
    const [trendingPeople,setTrendingPeople] = useState([])
  
  
    async function getTrending(mediaType,callback){
      let {data} = await axios(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=97a86bf1cbe807844b74bc8adc5461aa`) 
      callback(data.results.slice(0,10))
    }
  
    useEffect(()=>{
      getTrending(`movie`,setTrendingMovies)
      getTrending(`tv`,setTrendingTv)
      getTrending(`person`,setTrendingPeople)
  
    },[])

    return <infoContext.Provider value={{trendingMovies,trendingTv,trendingPeople}}>
            {props.children}
    </infoContext.Provider>

}



