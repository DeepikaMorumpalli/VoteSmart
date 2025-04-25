import { Link } from "react-router-dom"
import "./Welcome.css"
export default function Welcome() {
    return (
        <>
            <div className='home-main-container'>
                    <h1 className="heading">Welcome to Online Voting</h1>
                <div className="home-container">
                    <div className="image-div-content">
                        <div className="home-content">
                            <p className="alignment">We are committed to revolutionizing the democratic process through innovative online Voting solutions. Our platform is designed to empower individuals and organizations by providing a secure, accessible, and transparent voting experience.</p> <br />
                            <p className="alignment">
                                We're delighted to have you join us in shaping the future through the power of your vote. Our online voting platform has been designed to make the voting process convenient secure, and accessible to all eligible participants. Whether you're casting your vote for local elections, national intiatives, or organizational decision, your matters.
                            </p>
                        </div>
                        <img src="/src/assets/SmartVote-img.jpeg" alt="image" className="welcomePage-img" />
                    </div>
                </div>
                <Link to={'/vote'} className='vote'>Cast Your Vote</Link>
            </div>
        </>
    )
}