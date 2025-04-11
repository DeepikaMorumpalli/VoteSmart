import { useState } from "react"
import "./RegisterPage.css"
import { Link } from "react-router-dom"
export default function Welcome() {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [voterId, setVoterId] = useState('');

    async function register(e){
        e.preventDefault();
        await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({emailId, password}),
            headers: {'Content-type':'application/json'},
        })
    }

    return (
        <>
            <div className="register-main-container">
                <form className="register-container" onSubmit={register}>
                    <h1 className="register-h1">Registration Form</h1>
                    <div className="registration-input">
                        <label htmlFor="name"></label>
                        <input type="text" id='name' placeholder='Your Name' 
                        value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="registration-input">
                        <label htmlFor="voterId"></label>
                        <input type="text" id='voterId' placeholder='Your Voter ID' 
                        value={voterId} onChange={(e)=>setVoterId(e.target.value)}/>
                    </div>
                    <div className="registration-input">
                        <label htmlFor="emailId"></label>
                        <input type="text" id='emailId' placeholder='Your Email Id' 
                        value={emailId} onChange={(e)=>setEmailId(e.target.value)}/>
                    </div>
                    <div className="registration-input">
                        <label htmlFor="password"></label>
                        <input type="password" id='password' placeholder='Your Email Password' 
                        value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <button className='button'>Register</button>
                </form>
                <div className="sign-in-container">
                    <h2>Already have an account?</h2>
                    <button className='sign-in-button'>
                        <Link to={'/login'}>Sign In </Link>
                    </button>
                </div>
            </div>
            
        </>
    )
}