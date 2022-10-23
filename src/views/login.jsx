//The login/signup page of app. Ill make it dual-purpose
import {React, useState} from 'react'
//TODO Add pattern matching
//TODO I instantly forgot what to make this
//TODO Add "forgot password"
function Login(data) {
    import('../styles/loginStyle.css')

    let errorMessage;
    if (data !== null) {
        errorMessage = <p id="error_message">{data.message}</p>
    }
    //If a username can be used
    const [userAvailable, setUserAvailability] = useState(0)
    //If the username field is empty
    const [isEmpty, setEmpty] = useState(true)
    //If the email field is empty
    const [isLogin, setLogin] = useState(true)
    //Self Explanatory - Password visibility
    const [showPass, setVisible] = useState(false)
    //Password warning - string contains said warning
    const [passWarn, setWarn] = useState("")
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
    function OnPassChange(target)
    {
        let text = target.currentTarget.value
        if(text.length == 0) setWarn("")
        else if(text.length <= 8) setWarn("Your password is shorter than 8 characters")
        else if(false) setWarn("Your password has no special characters")
        else setWarn("")
    }
    return (
        <div id="R_login">
            <h2 id="header">{isLogin ? "Login" : "Sign up"}</h2><span id="userShow"></span>
            <form id="form" method="POST" action={"/api/login"+ (isLogin ? "" : "/new")}>
                {errorMessage}
                <div id="usernameSection">
                    <p id="user_availability" className='' hidden={isEmpty}>That username is {userAvailable ? "available" : "taken"}</p>
                    <label htmlFor="username" >Username</label>
                    <br />
                    <input onChange={(param) => {clearTimeout(delayCheckUser); delayCheckUser = setTimeout(() => OnUserInputChange(param), 450)}} id="username" name="name" type="text" placeholder="What do you like to go by?" required />
                </div>
                <div id="passwordSection">
                    <div id="user_pass_warn" hidden={isLogin || (passWarn === "")}>
                        <p id="warn_message">{passWarn}</p>
                        <p id="warn_notice">We'll let you use that password, but that's on you</p>
                    </div>
                    <label htmlFor="password" >Password</label>
                    <br />
                    <input id="password" onChange={OnPassChange} name="pass"  type={showPass ? "text" : "password" } placeholder="Make sure it's a strong password" required />
                    <span id="show_pass" onClick={() => setVisible(!showPass)}>{showPass ? "Hide" : "Show"}</span>
                </div>
                <br />
                <div id="emailSection">
                    <label htmlFor="email">Email</label>
                    <br />
                    <input onChange={e => setLogin(e.currentTarget.value === "")} id="email" name="email" type="email" placeholder="Ex: hello@example.com - only required to register" />
                </div>
                <br />
                <input id="submit_form" type="submit" value={isLogin ? "Login" : "Sign up"} disabled={!userAvailable}></input>
            </form>
        </div>
    )
}

export default Login