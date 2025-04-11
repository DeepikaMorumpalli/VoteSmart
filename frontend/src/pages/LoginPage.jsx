import "./LoginPage.css"
export default function LoginPage(){
    return(
        <>
           <div className='login-main-container'>
            <div className="login-container">
                <h1>Sign In</h1>
                <div className="login-input">
                    <label htmlFor="email"></label>
                    <input type="text" id='email' placeholder='Enter email' />
                </div>
                <div className="login-input">
                    <label htmlFor="login-password"></label>
                    <input type="password" id='login-password' placeholder='password' />
                </div>
                <button className='button'>Login</button>
            </div>
        </div>
        </>
    )
}