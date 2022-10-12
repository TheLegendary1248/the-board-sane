//The login/signup page of app. Ill make it dual-purpose
import React, {useEffect, useState} from "react";

const Head = require("./defHead.jsx")
const Body = require("./defBody.jsx")
const { useDeferredValue } = require("React")
require('dotenv').config()
//TODO Add pattern matching
//TODO Reuse form for both login and register
//TODO Add "forgot password" 

function Login() {
    const [available, setAvailable] = useState();

    async function checkUser() {
        console.log("hello")
        await fetch(process.env.ROOT_URL + "/api/login/checkUser")
        .then(res => { console.log(res); setAvailable(res);})
    }

    return (
        <html>
            <Head title="Login">
                <script rel="text/javascript" src={process.env.ROOT_URL + 'scripts/login.js'} defer></script>
            </Head>
            <Body>
                <h2>Login</h2>
                <p>Insert logging stuffs here.</p>
                <form method="POST" action="/api/login">
                    <p>{available}</p>
                    <label htmlFor="username" >Username</label>
                    <input id="username" type="text" onChange={() => checkUser()}></input>
                    <label htmlFor="">Password</label>
                    <input id="password" type="text"></input>
                    <input type="submit" value="Login"></input>
                </form>
            </Body>
        </html>
    )
}

module.exports = Login