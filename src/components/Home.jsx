import axios from 'axios';
import React, { useContext } from 'react'
import avatar from '../avatar.png'
import { Link } from 'react-router-dom';
import { infoContext } from './Store';




export default function Home() {
  
    const {trendingMovies,trendingTv,trendingPeople} =   useContext(infoContext)

  return (
    <>
    {trendingMovies? 
        <div className='row'>
          <div className='col-md-4 d-flex align-items-center'>
            <div>
                <div className='brdr w-25 '></div>
                  <h2>Trendig <br/> Movies <br/> To Watch Right Now </h2>
                  <p className='text-muted'> To Trending Movies By Week</p>
                <div className='brdr'></div>
            </div>
          </div>
          {trendingMovies.map((movie,i)=>
              <div  key={i} className="col-md-2">
                 <Link to={`/moreDetails/movie/${movie.id}`}>
                    <img className='w-100'  src={`https://image.tmdb.org/t/p/w500/` + movie.poster_path} alt="" srcset="" />
                    <h3 className='h6 mt-2 mb-5'>{movie.title}</h3>
                </Link>
              </div>
          )}
        </div>:  
        <div className='d-flex align-items-center justify-content-center'>
          <i className='fas fa-spinner fa-spin fa-3x'></i>
        </div> }


      {trendingTv?
            <div className='row my-5'>
            <div className='col-md-4 d-flex align-items-center'>
              <div>
                <div className='brdr w-25 '></div>
                  <h2>Trendig <br/> Tv <br/> To Watch Right Now </h2>
                  <p className='text-muted'> To Trending Tv By Week</p>
                <div className='brdr'></div>
              </div>
            </div>
            {trendingTv.map((tv,i)=>
                <div  key={i} className="col-md-2">
                  <Link to={`/moreDetails/${tv.media_type}/${tv.id }`}>
                      <img className='w-100'  src={`https://image.tmdb.org/t/p/w500/` + tv.poster_path} alt="" srcset="" />
                      <h3 className='h6 mt-2 mb-5'>{tv.name}</h3>
                  </Link>
                </div>
            )}
          </div>:
          <div className='d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin fa-3x'></i>
          </div>}      

      {trendingPeople?
          <div className='row'>
            <div className='col-md-4 d-flex align-items-center'>
              <div>
                  <div className='brdr w-25 '></div>
                    <h2>Trendig <br/> People <br/> To Watch Right Now </h2>
                    <p className='text-muted'> To Trending People By Week</p>
                  <div className='brdr'></div>
              </div>
            </div>
            {trendingPeople.map((person,i)=>
                <div  key={i} className="col-md-2">
                    <Link to={`/moreDetails/${person.media_type}/${person.id }`}>
                        {person.profile_path === null? <img src={avatar}className='w-100 avatarPic' />: <img className='w-100'  src={`https://image.tmdb.org/t/p/w500/` + person.profile_path}/>}                  
                         <h3 className='h6 mt-2 mb-5'>{person.name}</h3>
                    </Link>
                </div>
            )}
          </div>:
          <div className='d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin fa-3x'></i>
          </div>
      }


    </>
  )
}
