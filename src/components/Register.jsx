import React, { useState } from 'react'
import axios from 'axios'
import Joi from 'joi'
import { Link, useNavigate } from 'react-router-dom'
import Login from './Login';



export default function Register() {
  let navigate = useNavigate()
  const [passwordType,serPasswordType]=useState('password')

  const [isLoading,setIsLoading] =useState(false)
  const [validateError,setValidateError] = useState([])
  const [error,setError] = useState('')
  const [ user,setUser] = useState({
    first_name:'',
    last_name:'',
    age:'',
    email:'',
    password:''
  })

  //put user's properties's values from form
  function getUserData(e){
    let myUser = {...user}
    myUser[e.target.name] = e.target.value
    setUser(myUser) 
  }

  //submit form
  async  function  submitRegisterForm(e){
      e.preventDefault()
      setIsLoading(true)

      //call validation function
      let validateResult =  validateRegisterForm()
      //if the validation function return error
      if(validateResult.error){
        setIsLoading(false)
        setValidateError(validateResult.error.details)
      }else{
          let {data} = await  axios.post(`https://route-egypt-api.herokuapp.com/signup`,user)
          if(data.message =="success"){
            setIsLoading(false)
            navigate('/Login')
          }else{
            setError(data.message)
            setIsLoading(false)
          }
      }
  }

  function validateRegisterForm(){
    let scheme = Joi.object({
      first_name : Joi.string().alphanum().min(3).max(10).required(),
      last_name : Joi.string().alphanum().min(3).max(10).required(),
      age : Joi.number().min(16).max(90).required(),
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
        <h2>Register Now </h2>
      
        <form onSubmit={submitRegisterForm}>
          <label className='mt-3' htmlFor="first_name">first_name :</label>
          <input onChange={getUserData} className='form-control'  type="text"  id='first_name' name='first_name'/>
          { validateError.map((error)=> error.message.includes('first_name') ? <div className='text-danger'> *{error.message}</div>:"")}


          <label className='mt-3' htmlFor="last_name">last_name :</label>
          <input onChange={getUserData} className='form-control' type="text"  id='last_name'name='last_name'/>
          { validateError.map((error)=> error.message.includes('last_name') ? <div className='text-danger'> *{error.message}</div>:"")}

          <label className='mt-3' htmlFor="age">age :</label>
          <input onChange={getUserData} className='form-control' type="number"  id='age'name='age'/>
          { validateError.map((error)=> error.message.includes('age') ? <div className='text-danger'> *{error.message}</div>:"")}

          <label className='mt-3' htmlFor="email">email :</label>
          <input onChange={getUserData} className='form-control' type="email" id='email' name='email'/>
          { validateError.map((error)=> error.message.includes('email') ? <div className='text-danger'> *{error.message}</div>:"")}

          <label className='mt-3' htmlFor="password">password :</label>
          <div className='position-relative'>
            <input onChange={getUserData} className='form-control' type={`${passwordType}`} id='password' name='password'/>
            <i onClick={()=>changePasswordType()} class="fa-sharp fa-solid fa-eye text-info position-absolute top-50 end-0 translate-middle-y pe-3 cursor"></i>
          </div>
          { validateError.map((error)=> error.message.includes('password') ? <div className=' text-danger'> *Password Invalid</div>:"")}

          {error ? <div className="alert alert-danger m-2"> { error }</div>:''}  

          <div  className='text-muted mb-3 mt-3 '>already have an account ? <Link className='text-info' to={'/login'}>login</Link></div>

          <button type='submit' className='btn btn-outline-info mt-1'>
            {isLoading ?<i className='fas fa-spinner fa-spin'></i>: `Register`}
          </button>
        </form>
      </div>
    </>
  )
}
