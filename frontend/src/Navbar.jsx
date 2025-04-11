import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <>
            <header>
                <div className="logo">
                    <img src="./src/assets/logo-img.jpeg" alt="image" className='image' />
                    <Link to={'/welcome'}>SmartVote</Link>
                </div>
                <div className="links">
                    <Link to={'/register'} className="nav-link">New Registration</Link>
                    <Link to={'/admin'} className="nav-link">Admin</Link>
                    <Link to={'/login'} className="nav-link">
                        <button className='button'>Login</button>
                    </Link>
                </div>
            </header>
        </>
    )
}