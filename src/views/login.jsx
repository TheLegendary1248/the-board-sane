//The login/signup page of app. Ill make it dual-purpose
import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom'
//TODO Add pattern matching
//TODO Add "forgot password"
function Login(data) {
    import('../styles/login.css')
    //Navigate hook
    const navigate = useNavigate();
    //STATES
    //Error message should request fail for any reason
    const [error, setError] = useState("")
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
    async function OnUserInputChange(event)
    {
        console.log(event)
        delayCheckUser = null;
        //If the field is empty, remove the message box
        if(event.target.value === "") {setEmpty(true)} /*this.ok.stlye = this.warn.style = "display: none";*/
        //Otherwise, tell if the username is available
        else
        {
            setEmpty(false)
            let get = await fetch("http://localhost:8000/api/checkUser/" + event.target.value);
            let res = await get.json()
            console.log(res)
            //TODO Combine warn and ok, they both start with "That username is..."
            setUserAvailability(!res)
        }   
    }
    function OnPassChange(event)
    {
        let text = event.currentTarget.value
        if(text.length == 0) setWarn("")
        else if(text.length <= 8) setWarn("Your password is shorter than 8 characters")
        else if(false) setWarn("Your password has no special characters")
        else setWarn("")
    }
    async function HandleSubmit(event)
    {
        //Stop request
        event.preventDefault()
        //Check with server
        //return;
        let req = 
        await fetch("http://localhost:8000/api/login" + (isLogin ? "" : "/new"),{
        method: 'POST',
        headers: {
            //Note: FormData is .json, lovely aint it?
            'Content-Type':"application/json"
        },
        body: JSON.stringify(Object.fromEntries(new FormData(event.target).entries()))
        })
        console.log(Object.fromEntries(new FormData(event.target).entries()))
        console.log(JSON.stringify(Object.fromEntries(new FormData(event.target).entries())))
        console.log({Hello:"Deokdaoe", djaeijd:4})
        console.log(JSON.stringify({Hello:"Deokdaoe", djaeijd:4}))
        let get = await req.json()
        console.log(get)
        if(get) navigate("/board")
        else setError(isLogin ? "Invalid credentials" : "An error has ocurred")
    }
    return (
        <main id="R_login">
            <title>Login into the Board</title>
            <h2 id="header">{isLogin ? "Login" : "Sign up"}</h2><span id="userShow"></span>
            <form id="form" method="POST" onSubmit={(e) => HandleSubmit(e)} action={"http://localhost:8000/api/login"+ (isLogin ? "" : "/new")}>
                <p hidden={error == ""}>{error}</p>
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
                    <input 
                        id="password" name="pass" placeholder="Make sure it's a strong password"
                        onChange={OnPassChange} type={showPass ? "text" : "password" }  required />
                    <span id="show_pass" onClick={() => setVisible(!showPass)}>{showPass ? "Hide" : "Show"}</span>
                </div>
                <br />
                <div id="emailSection">
                    <label htmlFor="email">Email</label>
                    <br />
                    <input onChange={e => setLogin(e.currentTarget.value === "")} id="email" name={isLogin ? "" : "email" } type="email" placeholder="Ex: hello@example.com - only required to register" />
                </div>
                <br />
                <input id="submit_form" type="submit" value={isLogin ? "Login" : "Sign up"} disabled={!userAvailable && !isLogin}/>
            </form>
        </main>
    )
}

export default Login