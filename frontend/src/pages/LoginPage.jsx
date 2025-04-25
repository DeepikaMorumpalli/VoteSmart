import { useState, useContext } from "react"
import { Navigate } from "react-router-dom";
import "./LoginPage.css"
import { UserContext } from "../UserContext";

export default function LoginPage(){
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);
    async function login(e){
        e.preventDefault();
        const response = await fetch(import.meta.env.VITE_API_URL+'/login', {
            method: 'POST',
            body: JSON.stringify({emailId, password}),
            headers: {'Content-type':'application/json'},
            credentials: 'include',
        })
        if(response.ok){
            response.json().then(userInfo=>{
                setUserInfo(userInfo);
                setRedirect(true);
                console.log(userInfo);
            })
        } else{
            alert('wrong credentials');
        }
    }
    if(redirect){
        return <Navigate to={'/userDetails'} /> 
    } 
    return(
        <>
           <div className='login-main-container'>
            <form className="login-container" onSubmit={login}>
                <h1>Sign In</h1>
                <div className="login-input">
                    <label htmlFor="email"></label>
                    <input type="text" id='email' placeholder='Enter email' 
                    value={emailId} onChange={(e)=>setEmailId(e.target.value)}/>
                </div>
                <div className="login-input">
                    <label htmlFor="login-password"></label>
                    <input type="password" id='login-password' placeholder='Password' 
                    value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button className='button'>Login</button>
            </form>
        </div>
        </>
    )
}