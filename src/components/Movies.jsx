import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function Movies() {

  let pageNam = Array(13).fill(13).map((pageNum , i)=> i+1)
  const [trendingMovies,setTrendingMovies] = useState([])
  async function getTrending(pageNum){
    let {data} = await axios(`https://api.themoviedb.org/3/discover/movie?api_key=97a86bf1cbe807844b74bc8adc5461aa&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`) 
    setTrendingMovies(data.results)

  }

  useEffect(()=>{
    getTrending(1)
  },[])


 
  return (
    <>
    {trendingMovies.length === 20?      
        <div className='row justify-content-center'>
          {trendingMovies.map((movie,i)=>
              <div  key={i} className="col-md-2">
                <Link to={`/moreDetails/movie/${movie.id }`}>
                    <img className='w-100'  src={`https://image.tmdb.org/t/p/w500/` + movie.poster_path}  />
                    <h3 className='h6 mt-2 mb-5'>{movie.title}</h3>
                </Link>
              </div>
          )}
          <div className='d-flex justify-content-center'>
            <ul className="pagination">
                {pageNam.map((el)=>
                    <li onClick={()=>getTrending(el)}  className="page-item "><a className='page-link bg-transparent cursor' >{el}</a></li>
                )}
            </ul>          
          </div>  
        </div> :
        <div className='vh-100 d-flex align-items-center justify-content-center'>
        <i className='fas fa-spinner fa-spin fa-3x'></i>
       </div>}
    </>
  )
}
