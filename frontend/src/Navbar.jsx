import { useEffect, useContext } from "react";
import { Link , useNavigate} from "react-router-dom"
import { UserContext } from "./UserContext"

export default function Navbar() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + '/profile', {
            credentials: 'include',
            method: "GET",
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        })
    }, []);
    function logout() {
        fetch(import.meta.env.VITE_API_URL + '/logout', {
            method: 'POST',
            credentials: 'include',
        })
        .then(() => {
            setUserInfo(null);
            localStorage.clear();
            // sessionStorage.clear();
            navigate('/'); 
        });
    }

    const navigate = useNavigate();
    const emailId = userInfo?.emailId;

    return (
        <>
            <header>
                <div className="logo">
                    <img src="./src/assets/logo-img.jpeg" alt="image" className='image' />
                    <Link to={'/welcome'}>SmartVote</Link>
                </div>
                <div className="links">
                    {emailId && (
                        <>
                            {emailId}
                            <a onClick={logout} className="nav-link">
                                <button className='button'>Logout</button>
                            </a>
                        </>
                    )}
                    {!emailId && (
                        <>
                            <Link to={'/register'} className="nav-link">New Registration</Link>
                            {/* <Link to={'/admin'} className="nav-link">Admin</Link> */}
                            <Link to={'/login'} className="nav-link">
                                <button className='button'>Login</button>
                            </Link>
                        </>
                    )}
                </div>
            </header>
        </>
    )
}