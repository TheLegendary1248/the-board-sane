import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
let showMessage = true;
export default function ChangeLogin(data) {
    import('../styles/changeLogin.css')
    let [firstpassval, setFirst] = useState("")
    let [secondpassval, setSecond]  = useState("")
    
    let { userID, token } = useParams()
    
    useEffect(() => {
        console.log("Rendered!")
    })
    //Forgot 
    async function ForgotPassword(event) {
        //TODO Add in password from form. Ensure fields match as well
        let req = await fetch("/api/login/verify", {
            method: "POST",
            body: JSON.stringify({ userID, token }),
            headers: { "Content-Type": "application/json"},
        })
        let res = await req.json()
    }
    async function ChangePassword(event) {
        let req = await fetch("/api/user/changepass", {
            method: "PATCH",
            body: JSON.stringify({ oldpass:"oldpass", newpass: "newpass" }),
            headers: { "Content-Type": "application/json"},
        })
        let res = await req.json()
    }
    let warnMismatch = 
    <div>
        Passwords do not match
    </div>
    let ForgotPasswordRender = <div id="block">
            <div id="warn_token" hidden={showMessage}>
                <span>Verification token does not exist. </span>
                <span>Please request a new email for a new one</span>
            </div>
            <main className={showMessage ? "" : "blur"}>
                <h1><span>Forgot Your <span id="tiltedText">Password?</span></span></h1>
                <p>Don't worry, it happens to the best of us</p>
                <form>
                    { firstpassval == secondpassval ? null: warnMismatch}
                    <label htmlFor="new_pass">Enter a new password</label>
                    <input class="default" id="new_pass" placeholder='A cool new shiny password' onChange={e => {setFirst(e.target.value)}}></input>
                    <br></br>
                    <label htmlFor="new_pass2">Re-enter your new password</label>
                    <input class="default" id="new_pass2" placeholder='A cool new shiny password, but retyped' onChange={e => {setSecond(e.target.value)}}></input>
                    <input class="default" type="submit" value="Change password"></input>
                </form>
            </main>
        </div>
    let ChangePasswordRender = <div id="block">
            <main>
                <h1>Change Login</h1>
                <p>That dusty old password could use a change</p>
                <p>Enter your current password below</p>
                { firstpassval == secondpassval ? null : warnMismatch}
                <label>Enter your new password</label>
                <input class="default" placeholder='Current Old Password' onChange={e => {setFirst(e.target.value)}}></input>
                <label>Retype your new password</label>
                <input class="default" placeholder='The New Password You Want' onChange={e => {setSecond(e.target.value)}}></input>
                
                <p>Or we can send you an email if you forgot it</p>
                <input class="default" type="submit" value="Forgot Password?" onClick={()=>{alert("hi!")}}></input>
            </main>
        </div>
    
    return (
        <div id="R_changelogin">
            {/**Show this message if there was an attempt to use a non-valid 'forgot' token*/}
            {token ? ForgotPasswordRender : ChangePasswordRender}
        </div>
    )
    
    
}

