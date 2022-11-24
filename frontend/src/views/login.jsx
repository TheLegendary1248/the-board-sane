//The login/signup page of app. Ill make it dual-purpose
import { React, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import common from '../common_passwords/passwords.json'
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//TODO Add pattern matching
//TODO Add "forgot password"
//Saved as the "setTimeout" return value
let availabilityCheckTimeout = 0;
//'Snapshots' of the before values for testing input changes
let prevUser = "";
let prevEmail = "";
//Aborter for the credentials check, incase previous fetches have not been made before input changes
let checkAborter = new AbortController();
let originalFetchBody = {};
function Login(data) {
    import('../styles/login.css')
    //Navigate hook
    const navigate = useNavigate();
    //STATES
    //Error message should request fail for any reason
    const [message, setMessage] = useState("")
    //Message type for css reasons
    const [msgType, setMsgType] = useState("warn")
    //If the email field is empty
    const [isLogin, setIsLogin] = useState(true)
    //Self Explanatory - Password visibility
    const [showPass, setPassVisible] = useState(false)
    //Show forgot password button
    const [showForgot, setForgotVisible] = useState(false)
    //Password warning - string contains said warning
    const [passWarn, setWarn] = useState("")
    //Email input field reference
    const emailField = useRef(null)
    //Username input field reference
    const userField = useRef(null)
    //Email correction input field reference
    const correctEmailField = useRef(null)
    //Flag that determines moving onto the verification state
    const [enteredVerify, SetVerify] = useState(false)
    //Availability of email
    const [emailIsValid, setEmailValidity] = useState(null)
    //Availability of username
    const [nameIsValid, setNameValidity] = useState(null)
    //If the request checking username and email has been made
    const [credsChecked, setCredsCheck] = useState(false)
    //If the request to login/sign up is pending
    const [awaitingFetch, setAwaitingFetch] = useState(false)
    //Email value
    const [emailValue, setEmail] = useState("")

    //Check if the username and email are available, if they changed
    async function OnUserInputChange() {
        //Cancel any concurrent fetches if any
        checkAborter.abort();
        checkAborter = new AbortController();
        availabilityCheckTimeout = null;
        //Username check
        if (userField.current.value !== prevUser) {
            setNameValidity(null)
            //If the field was left empty, do not check
            if (userField.current.value !== "") {
                console.log("User checked")
                let get = await fetch("/api/checkUser/" + userField.current.value, { signal: checkAborter.signal })
                get.json().then(res => { setNameValidity(!res); prevUser = userField.current.value; })
            }
        }
        //Email check 
        let emailRef = enteredVerify ? correctEmailField : emailField
        if (emailRef.current.value !== prevEmail) {
            console.log("Email checked")
            setEmailValidity(null)
            //If email is a valid email address - yes the Regex was pulled off the internet, it's very confusing 
            //FIXME This regex tends to have 'recursion' errors with weird emails, typically ones I make up for the sake of it
            if (emailRef.current.value.match(emailRegex)) {
                let get = await fetch("/api/checkEmail/" + emailRef.current.value, { signal: checkAborter.signal });
                get.json().then(res => { setEmailValidity(!res); prevEmail = emailRef.current.value; })
            }
        }
        setCredsCheck(true)
    }
    //Warn of a weak password when registering
    function OnPassChange(event) {
        let text = event.currentTarget.value
        const hasLower = /^(?=.*[a-z])$/
        const hasHigher = /^(?=.*[A-Z])$/
        const hasSpecial = /^/
        //TODO Insult the user if their password is on the 100 most common passwords list
        if (text.length == 0) setWarn("")
        else if(text === userField.current.value) setWarn("Your password shouldn't be the same as your username")
        else if(common[text]) setWarn(common[text])
        else if (text.length <= 8) setWarn("Your password is shorter than 8 characters")
        else if (false) setWarn("Your password has no special characters")
        else setWarn("")
    }
    //Set credentials check on a timeout
    function DelayCheck() {
        setCredsCheck(false)
        clearTimeout(availabilityCheckTimeout);
        availabilityCheckTimeout = setTimeout(OnUserInputChange, 650);
    }
    //Handle the login form request
    async function HandleSubmit(event) {
        //Handle request programmatically
        event.preventDefault()
        setAwaitingFetch(true)
        let body = Object.fromEntries(new FormData(event.target).entries())
        body.serverOptions = { fakeResponse : true, delay: 2000}
        originalFetchBody = body;
        let req = await fetch("/api/login" + (isLogin ? "" : "/new"), {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(body),
        })
        //If it is login, handle showing forgot password, else navigation to the app
        if (isLogin) {
            //Await request 
            let get = await req.json()
            console.log(get)
            if (get) navigate("/board")
            else {
                if (isLogin) setForgotVisible(true)
                setMessage(isLogin ? "Invalid credentials" : "An error has ocurred")
                setMsgType("warn")
            }
        }
        //Warn email may be wrong if the server had an error sending the email
        else {
            setEmail(emailField.current.value);
            SetVerify(true)
        }
        setAwaitingFetch(false)
    }
    //Handles correction of email after signing up
    async function HandleCorrection(event) {
        event.preventDefault()
        //Same as submit, just alter the original body to use the correct email
        let body = {...originalFetchBody}
        let formData = new FormData(event.target)
        body.email = formData.get('email')
        body.serverOptions = {fakeResponse: true, delay: 2500}
        setAwaitingFetch(true)
        let req = await fetch("/api/login/new", {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        let get = await req.json()
        setAwaitingFetch(false)
        setEmail(body.email)
    }
    //Handles the forgot password function
    function IdentityCrisis() {
        let recepient; //Value to be sent
        //Send an email to the given email address, or username if the email address is empty
        let isEmailEmpty = (emailField.current.value === "")
        if (isEmailEmpty) recepient = userField.current.value;
        else recepient = emailField.current.value
        //Set message and handle forgot check
        let url = "/api/user/forgot/" + (isEmailEmpty ? "name/" : "email/") + recepient
        HandleForgotCheck(url)
        setMessage(`We've sent an email to reset your password ${isEmailEmpty ? "to" : "at"} "${recepient}"`)
        setMsgType("")
    }
    //Handles the response AFTER IdentityCrisis runs. If the server returns false, then the account username or email is wrong
    async function HandleForgotCheck(url) {
        let req = await fetch(url, {method: "POST"})
        let res = await req.json()
        if (!res) { setMessage("This account does not exist. Please double check your spelling"); setMsgType("warn") }
    }
    return (
        <main id="R_login">
            <title>Login into the Board</title>
            <h2 id="header">{enteredVerify ? "Verify" : (isLogin ? "Login" : "Sign up")}</h2><span id="userShow"></span>
            <div id="container">
                <section id="form_block" className={enteredVerify ? 'up' : ''} hidden={false}>
                    <form id="form" onSubmit={HandleSubmit}>
                        <p id="message" className={msgType} hidden={message == ""}>{message}</p>
                        <div id="emailSection">
                            <label htmlFor="email">Email - only required to sign up</label>
                            <br />
                            <input ref={emailField} onChange={e => { setIsLogin(e.currentTarget.value === ""); DelayCheck(); }} id="email" name={isLogin ? "" : "email"} type="email" placeholder="Ex: hello@example.com - only required to sign up" />
                            <p id="email_availability" className='warn' hidden={isLogin ? true : emailIsValid ?? true}>That email is already in use!</p>
                        </div>
                        <br />
                        <div id="usernameSection">
                            <label htmlFor="username" >Username</label>
                            <br />
                            <input ref={userField} onChange={isLogin ? null : DelayCheck} id="username" name="name" type="text" placeholder="What do you like to go by?" required />
                            <p id="user_availability" className='warn' hidden={isLogin ? true : nameIsValid ?? true}>That username is already taken. Sorry :(</p>
                        </div>
                        <div id="passwordSection">

                            <label htmlFor="password" >Password</label>
                            <br />
                            <input
                                id="password" name="pass" placeholder="Make sure it's a strong password"
                                onChange={OnPassChange} type={showPass ? "text" : "password"} required />
                            <span id="show_pass" className={showPass ? "shown" : ""} onClick={() => setPassVisible(!showPass)}>{showPass ? "Hide" : "Show"}</span>
                            <div id="user_pass_warn" hidden={isLogin ? true : (passWarn === "")}>
                                <p className="warn" id="warn_message">{passWarn}</p>
                                <p className="warn" id="warn_notice">We'll let you use that password, but you should try better</p>
                            </div>
                        </div>
                        <br />
                        <input id="submit_form" type="submit" value={isLogin ? "Login" : "Sign up"} 
                        disabled={
                            //Disable if awaiting fetch request
                            awaitingFetch ? //Disable if creds have not been checked
                            true : credsChecked ? //Disable if creds are not available (while it is a login)
                                (!(nameIsValid && emailIsValid) && !isLogin) : true} />
                        
                    </form>
                    <input id="forgot_pass" type="submit" value="Forgot Password?" hidden={!showForgot} onClick={IdentityCrisis}></input>
                    <div id="inform_await" hidden={!awaitingFetch}>
                        <p>Awaiting request from server</p>
                        <div id="progress_bar"><div id="progress_bar_fill"></div></div>
                    </div>
                </section>
                <section id="correction_block" hidden={!enteredVerify} className="down">
                    <h2>We've sent a verification email to <a href={"https://" + emailValue.split("@")[1]} target="_blank">{emailValue}</a></h2>
                    <p>If you've mispelled your email, you can correct it below and try again</p>
                    <form onSubmit={HandleCorrection}>
                        <label htmlFor="correct_email">Correct Email</label>
                        <br/>
                        <input id="correct_email" placeholder="Did you mispell your email that badly?" onChange={DelayCheck} type="email" defaultValue={emailValue} ref={correctEmailField} name="email" required></input>
                        <p id="email_availability" className='warn' hidden={emailIsValid ?? true}>That email is already in use!</p>
                        <input type="submit" value="Fix email" disabled={awaitingFetch ? true : credsChecked ? !emailIsValid : true}></input>
                        <div id="inform_await" hidden={!awaitingFetch}>
                        <p>Awaiting request from server</p>
                        <div id="progress_bar"><div id="progress_bar_fill"></div></div>
                    </div>
                    </form>
                </section>
            </div>
        </main>
    )
}

export default Login