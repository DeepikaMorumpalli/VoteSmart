import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import "./CastVote.css";

export default function CastVote(){
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [emailId, setEmailId] = useState('');
    const [candidate, setCandidate] = useState('');
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        const checkAuth = async () => {
          try {
            const res = await fetch(import.meta.env.VITE_API_URL+'/check-auth', {
              method: 'GET',
              credentials: 'include', 
            });
            if (!res.ok) throw new Error();
            setIsAuthenticated(true);
          } catch {
            setIsAuthenticated(false);
          }
        };
        checkAuth();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch(import.meta.env.VITE_API_URL+'/vote', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json',},
            body: JSON.stringify({ emailId, candidate }),
          });
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message);
          }
          alert(data.message); // ✅ Success
          setRedirect(true);
        } catch (err) {
          alert(err.message); // ❌ Error (e.g., duplicate vote)
        }
    };
    if (isAuthenticated === false) return <Navigate to="/login" replace />;
    if(redirect){
        return <Navigate to={'/results'} /> 
    } 
    return(
        <div className='login-main-container'>
            <form className="login-container" onSubmit={handleSubmit}>
                <h1>Cast Your Vote</h1>
                <div className="login-input">
                    <label htmlFor="email"></label>
                    <input type="text" id='email' placeholder='Enter email' 
                    value={emailId} onChange={(e)=>setEmailId(e.target.value)}/>
                </div>
                <select  value={candidate} onChange={(e) => setCandidate(e.target.value)} required className='select-candidate'>
                    <option value="">Select Candidate</option>
                    <option value="Deepika" className='fontStyles'>Deepika</option>
                    <option value="Madhu" className='fontStyles'>Madhu</option>
                    </select>
                <button className='button'>Vote</button>
            </form>
        </div>
    )
}