import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
let showMessage = true;
export default function ChangeLogin(data) {
    import('../styles/changeLogin.css')
    let { userID, token } = useParams()
    useEffect(() => {
        //If the forgot flag is set, authenticate with the parameters
        let abortCtrl = new AbortController()
        if(userID & token) 
        { 
            HandleForgotSection(abortCtrl) 
        }
        return () => {
            abortCtrl.abort()
        }
    }, [])
    /**
     * Handles the "Forgot Password" part of this section
     * @param {AbortController} abortCtrl 
     */
    async function HandleForgotSection(abortCtrl) {
        console.log(userID)
        console.log(JSON.stringify({ userID: userID, token: token }))
        if (data.forgot) {
            let req = await fetch("/api/login/verify", {
                signal: abortCtrl.signal,
                method: "POST",
                body: JSON.stringify({ userID, token }),
                headers: { "Content-Type": "application/json"},
            })
            let res = await req.json()
        }

    }
    //Shaddup. It's my mess, not yours.
    //TODO ADD A FLIPPIN BUTTON TO SUBMIT PASSWORD CHANGE YOU ABSOLUTE MORON
    let forgot =
        <div id="block">
            <div id="warn_token" hidden={showMessage}>
                <span>Verification token does not exist. </span>
                <span>Please request a new email for a new one</span>
            </div>
            <main className={showMessage ? "" : "blur"}>
                <h1><span>Forgot Your <span id="tiltedText">Password?</span></span></h1>
                <p>Don't worry, it happens to the best of us</p>
                <p>If you need to get to one your boards quick, you can <a href='/board' target="_blank">click here for a new tab</a></p>
                <p>Just don't leave this page without changing your password.</p>
                <form>
                    <label htmlFor="new_pass">Enter a new password</label>
                    <input id="new_pass" placeholder='A cool new shiny password'></input>
                    <br></br>
                    <label htmlFor="new_pass2">Re-enter your new password</label>
                    <input id="new_pass2" placeholder='A cool new shiny password, but retyped'></input>
                </form>
            </main>
        </div>
    let notForgot =
        <div id="block">
            <main>
                <h1>Change Login</h1>
                <p>That dusty old password could use a change</p>
                <p>Enter your current password below</p>
                <input placeholder='Your password'></input>
                <p>Or we can send you an email if you forgot it</p>
                <input type="submit" value="Forgot Password?" onClick={()=>{alert("hi!")}}></input>
            </main>
        </div>
    return (
        <div id="R_changelogin">
            {/**Show this message if there was an attempt to use a non-valid 'forgot' token*/}
            {data.forgot ? forgot : notForgot}
        </div>
    )
}

function NormalChange(){

}

function ForgotPassword(){

}