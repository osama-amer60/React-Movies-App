import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';

export default function MoreDetails() {

    const params = useParams()

    const [MoreDetails,setMoreDetails] = useState(null)

    async function getMoreDetails(type,id){
        let {data} = await axios(`https://api.themoviedb.org/3/${type}/${id}?api_key=97a86bf1cbe807844b74bc8adc5461aa&language=en-US`)
        setMoreDetails(data)
    }

    useEffect(()=>{
        getMoreDetails(params.type,params.id)
    },[])

  return (
    <>
    {MoreDetails  ?
    
        <div className='row mt-5 mb-5'>
            <div className="col-3 mb-5">
                {params.type == 'person'? <img className='w-100' src={`https://image.tmdb.org/t/p/w500/` + MoreDetails.profile_path}/>: <img className='w-100' src={`https://image.tmdb.org/t/p/w500/` + MoreDetails.poster_path}/>} 
            </div>
            <div className="col-9">
                    <div className='m-3'>
                      {params.type == 'movie'?<h1>{MoreDetails.title}</h1>:<h1>{MoreDetails.name}</h1>}
                        
                        {params.type == 'person'?   
                        <ul className='mt-5'>
                          <li className='mb-2'>Job : {MoreDetails.known_for_department}</li>
                          <li className='mb-2'>birthday     : {MoreDetails.birthday}</li>
                          <li className='mb-2'>gender     : {MoreDetails.gender == 1 ? `female`:`male`}</li>
                          <li className='mb-2'>popularity : {MoreDetails.popularity}</li>                   
                        </ul>:
                       <>
                         <p className='py-3 text-muted'>{MoreDetails.overview}</p>
                        <ul>
                            <li className='mb-2'>budget : {MoreDetails.budget} $</li>
                            <li className='mb-2'>original_language : {MoreDetails.original_language}</li>
                            <li className='mb-2'>popularity : {MoreDetails.popularity}</li>
                            <li className='mb-2'>vote_average : {MoreDetails.vote_average}</li>
                            <li className='mb-2'>vote_count : {MoreDetails.vote_count}  vote</li>
                         </ul>
                       </>}

                    </div>
            </div>
         </div>:
        <div className='vh-100 d-flex align-items-center justify-content-center'>
         <i className='fas fa-spinner fa-spin fa-3x'></i>
        </div>
         }
</>
  )
}
