import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './login.css'
import './new.css'
import axios from 'axios'

async function postData({email, password}) {
    const formData = new FormData();
    formData.append("email", email)
    formData.append("password", password)
    
  
    const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, {email, password})
    return result.data
  }

export const Login = ({show, setShow, set}) => {
    const history = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    
    async function addNewProduct () {
        try{
            const result = await postData({ email, password})
        if(result){
            console.log(result)
            set(true)
            localStorage.setItem('token', result.signedToken);
            localStorage.setItem('user', JSON.stringify(result.user));
            history('/dashboard')
        }else{
            setError(true)
        }
        }catch(error){
            setError(true)
        }
        
    }


    return (
        <>
      { show && (<div className="body">
            <div className="login-box">
                    <h2>Login</h2>
                    {error && (<h4 style={{color:'red'}}>Incorrect sign up details</h4>)}
                    <form>
                        <div className="user-box">
                            <input type="text" email value={email} onChange={(e)=>{setEmail(e.target.value); setError(false)}} />
                            <label>Email</label>
                        </div>
                        <div className="user-box">
                            <input type="password"   value={password} onChange={(e)=>{setPassword(e.target.value); setError(false)}}/>
                            <label>Password</label>
                        </div>
                        <a href="#" onClick={addNewProduct}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Login
                        </a>
                    </form>
                </div>
        </div>) }
        </>
        
    )
}
