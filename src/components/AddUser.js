import axios from 'axios'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
 
 export default function AddUser() {

    let navigate=useNavigate()
  const [user,setUser]=useState({
     name:"",
     userName:"",
     email:""
  })

  const{name,userName,email}=user

  const onInputChange=(e)=>{
   setUser({...user,[e.target.name]:e.target.value})
  }
  const onSubmit=async(e)=>{
 e.preventDefault();
 await axios.post("http://localhost:9091/",user)
 navigate("/")
  }

   return (
   
     <div className='container'>
        <div className='row'> 
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow' >
         <h2 className='text-center m-4'>Register d'utulisateur</h2>
       <form onSubmit={(e)=> onSubmit(e)}>
        <div className='mb-3'>
            <label htmlFor="Name" className='form-label'>Name</label>
            <input 
            type={"text"}
            className='form-control'
            placeholder='Enter your name '
            name="name"
            value={name }
            onChange={(e)=>onInputChange(e)}
            />
         </div>
         <div className='mb-3'>
            <label htmlFor="UserName" className='form-label'>UserName</label>
            <input 
            type={"text"}
            className="form-control"
            placeholder="Enter your username "
            name="username"
            value={userName}
            onChange={(e)=>onInputChange(e)}
            />

       <div className='mb-3'>
            <label htmlFor="UserName" className='form-label'>Passe Word</label>
            <input 
            type={"text"}
            className="form-control"
            placeholder="Enter your password "
            name="username"
            value={userName}
            onChange={(e)=>onInputChange(e)}
            />


          <div className='mb-3'>
            <label htmlFor="Email" className='form-label'>Email</label>
            <input 
            type={"text"}
            className='form-control'
            placeholder='Email@gmail.com '
            name="email"
            value={email}
            onChange={(e)=>onInputChange(e)}
            />

         </div>
         <button type="submit" className='btn btn-outline-primary'>Ajouter</button>
         <Link  className='btn btn-outline-danger mx-2' to="/">Annuler</Link>
        </div>
        </div>
        </form>
        </div>
        </div>
        </div>
   )
 }
 