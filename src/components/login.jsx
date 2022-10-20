//The login/signup page of app. Ill make it dual-purpose
import React from 'react'
import '../styles/loginStyle.css'
//TODO Add pattern matching
//TODO Add "forgot password"
//TODO TRANSPILE JS INTO REACT STUFFS HERE BASED OFF 'login.js'
function Login(data) {
    let errorMessage;
    if (data !== null) {
        errorMessage = <p id="error_message">{data.message}</p>
    }
    return (
        <div>
            <h2 id="header">Login</h2><span id="userShow"></span>
            <form id="form" method="POST" action="/api/login">
                {errorMessage}
                <div>
                    <p id="user_ok" className="ok" style={{ display: "none" }}>That username is available</p>
                    <p id="user_warn" className="warn" style={{ display: "none" }}>That username is taken</p>
                    <label htmlFor="username" >Username</label>
                    <br />
                    <input id="username" name="name" type="text" placeholder="What do you like to go by?" required />
                </div>
                <div>
                    <p id="user_pass_warn"></p>
                    <label htmlFor="password" >Password</label>
                    <br />
                    <input id="password" name="pass" type="password" placeholder="Make sure it's a strong password" required />
                    <span id="show_pass">Show</span>
                </div>
                <br />
                <div>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input id="email" name="email" type="email" placeholder="Ex: hello@example.com - only required to register" />
                </div>
                <br />
                <input id="submit_form" type="submit" value="Login"></input>
            </form>
        </div>
    )
}

export default Login