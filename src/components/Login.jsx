import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi'
import { Link, useNavigate } from 'react-router-dom'
import Home from './Home';


export default function Login(props) {

  let navigate = useNavigate()
  const [passwordType,serPasswordType]=useState('password')
  const [isLoading,setIsLoading] =useState(false)
  const [validateError,setValidateError] = useState([])
  const [error,setError] = useState('')
  const [ user,setUser] = useState({
    email:'',
    password:''
  })


  //aviod open the page if user aleady in
  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      navigate('/home')
    }
  },[])

  function getUserData(e){
    let myUser = {...user}
    myUser[e.target.name] = e.target.value
    setUser(myUser) 
  }

  async  function  submitLoginForm(e){
      e.preventDefault()
      setIsLoading(true)

      let validateResult =  validateLoginForm()
      if(validateResult.error){
        setIsLoading(false)
        setValidateError(validateResult.error.details)
        console.log(validateResult.error.details)
      }else{
          let {data} = await  axios.post(`https://route-egypt-api.herokuapp.com/signin`,user)
          if(data.message =="success"){
            setIsLoading(false)
            localStorage.setItem('userToken', data.token)
            props.getUserData()
            navigate('/')
          }else{
            setError(data.message)
            setIsLoading(false)
          }
      }
  }

  function validateLoginForm(){
    let scheme = Joi.object({
      email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password : Joi.string().pattern(new RegExp('^[A-Z[a-z]{3,30}$')).required(),
    })
    return scheme.validate(user,{abortEarly:false})
  }

  function changePasswordType(){
    let passwordFiled = passwordType;
        passwordFiled = passwordFiled ===`password`?`text` : `password`;
         serPasswordType(passwordFiled)
  }
   
  return (
    <>
      <div className='w-75 m-auto'>
        <h2 className='mb-4'>Login Now </h2>

              
        <form onSubmit={submitLoginForm} >
          
          <label className='mt-2' htmlFor="email">email :</label>
          <input onChange={getUserData} className='form-control' type="email" id='email' name='email'/>
          { validateError.map((error)=> error.message.includes('email') ? <div className='mb-2 text-danger'> *{error.message}</div>:"")}

          <label className='mt-2' htmlFor="password">password :</label>
          <div className='position-relative'>
            <input onChange={getUserData} className='form-control mb-3 ' type={`${passwordType}`} id='password' name='password'/>
            <i onClick={()=>changePasswordType()} class="fa-sharp fa-solid fa-eye text-info position-absolute top-50 end-0 translate-middle-y pe-3 cursor"></i>
          </div>

          { validateError.map((error)=> error.message.includes('password') ? <div className='mb-2  text-danger'> *Password Invalid</div>:"")}
          {error ? <div className="alert alert-danger m-2"> { error }</div>:''}  

          <div  className='text-muted mb-3 mt-3 '>have't account  ? <Link className='text-info' to={'/register'}>Register now</Link></div>

          <button type='submit' className='btn btn-outline-info mt-1'>
            {isLoading ?<i className='fas fa-spinner fa-spin'></i>: `Login`}
          </button>
        </form>
      </div>
    </>
  )
}
