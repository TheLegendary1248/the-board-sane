//The login/signup page of app. Ill make it dual-purpose
import {React, useState} from 'react'
import '../styles/loginStyle.css'
//TODO Add pattern matching
//TODO Add "forgot password"
//TODO TRANSPILE JS INTO REACT STUFFS HERE BASED OFF 'login.js'
function Login(data) {
    let errorMessage;
    if (data !== null) {
        errorMessage = <p id="error_message">{data.message}</p>
    }
    //If a username can be used
    const [userAvailable, setUserAvailability] = useState(0)
    const [isEmpty, setEmpty] = useState(true)
    let delayCheckUser = 0;
    async function OnUserInputChange(target)
    {
        console.log(target)
        delayCheckUser = null;
        //If the field is empty, remove the message box
        if(target.target.value === "") {setEmpty(true)} /*this.ok.stlye = this.warn.style = "display: none";*/
        //Otherwise, tell if the username is available
        else
        {
            setEmpty(false)
            let get = await fetch("http://localhost:8000/api/checkUser/" + target.target.value);
            let res = await get.json()
            console.log(res)
            //TODO Combine warn and ok, they both start with "That username is..."
            setUserAvailability(!res)
        }   
    }
    return (
        <div>
            <h2 id="header">Login</h2><span id="userShow"></span>
            <form id="form" method="POST" action="/api/login">
                {errorMessage}
                <div id="usernameSection">
                    <p id="user_availability" className='' hidden={isEmpty}>That username is {userAvailable ? "available" : "taken"}</p>
                    <label htmlFor="username" >Username</label>
                    <br />
                    <input onChange={(param) => {clearTimeout(delayCheckUser); delayCheckUser = setTimeout(() => OnUserInputChange(param), 450)}} id="username" name="name" type="text" placeholder="What do you like to go by?" required />
                </div>
                <div id="passwordSection">
                    <p id="user_pass_warn"></p>
                    <label htmlFor="password" >Password</label>
                    <br />
                    <input id="password" name="pass" type="password" placeholder="Make sure it's a strong password" required />
                    <span id="show_pass">Show</span>
                </div>
                <br />
                <div id="emailSection">
                    <label htmlFor="email">Email</label>
                    <br />
                    <input id="email" name="email" type="email" placeholder="Ex: hello@example.com - only required to register" />
                </div>
                <br />
                <input id="submit_form" type="submit" value="Login" disabled={!userAvailable}></input>
            </form>
        </div>
    )
}

export default Login