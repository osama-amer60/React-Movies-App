import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import avatar from '../avatar.png'



export default function People() {

  const [trendingPeople,setTrendingPeople] = useState([])

  async function getTrending(){
    let {data} = await axios(`https://api.themoviedb.org/3/trending/person/week?api_key=97a86bf1cbe807844b74bc8adc5461aa`) 
    setTrendingPeople(data.results)
  }

  useEffect(()=>{
    getTrending()
  },[])

 
  return (
    <>
    {trendingPeople?        
        <div className='row justify-content-center'>
          {trendingPeople .map((person,i)=>
              <div  key={i} className="col-md-2">
                <Link  to={`/moreDetails/${person.media_type}/${person.id }`}>
                {person.profile_path === null? <img src={avatar}className='w-100 avatarPic' />: <img className='w-100'  src={`https://image.tmdb.org/t/p/w500/` + person.profile_path}/>}
                    <h3 className='h6 mt-2 mb-5'>{person.name}</h3>
                </Link>
              </div>
          )}
        </div>:
        <div className='vh-100 d-flex align-items-center justify-content-center'>
        <i className='fas fa-spinner fa-spin fa-3x'></i>
       </div>}
    </>
  )
}
