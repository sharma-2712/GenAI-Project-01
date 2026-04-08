import React, { useState } from 'react'
import '../form.auth.scss'
import { Link } from 'react-router'
import {useAuth} from '../hooks/useAuth'


const Login = () => {

    const {loading,handleLogin}=useAuth();

    const [email,setEmail]=useState("");
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit=async (e)=>{
        e.preventDefault()
        setErrorMessage("")
        try {
            await handleLogin({email,password})
        } catch (error) {
            setErrorMessage(error.message || "Login failed")
        }
    }
    if(loading){
        return (<main>
            <h1>Loading.....</h1>
        </main>)
    }
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} >
                {errorMessage ? <p>{errorMessage}</p> : null}
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e)=>{setEmail(e.target.value)}}
                     type="email" id="email" name="email" required placeholder='Enter Email Address' />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                    onChange={(e)=>{setPassword(e.target.value)}}
                    type="password" id="password" name="password" required placeholder='Enter Password' />
                
                <button className='button primary-button' type="submit">Login</button></div>
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login
