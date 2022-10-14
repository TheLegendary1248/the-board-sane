//The login/signup page of app. Ill make it dual-purpose
const React = require("React")
const Head = require("./defHead.jsx")
const Body = require("./defBody.jsx")
require('dotenv').config()
//TODO Add pattern matching
//TODO Reuse form for both login and register
//TODO Add "forgot password" 

function Login() {

    return (
        <html>
            <Head title="Login">
                <script rel="text/javascript" src={process.env.ROOT_URL + 'scripts/login.js'} defer></script>
            </Head>
            <Body>
                <h2>Login</h2>
                <p>Insert logging stuffs here.</p>
                <form method="POST" action="/api/login">
                    <div>
                        <p id="user_ok" className="ok" style={{display: "none"}}>That is available</p>
                        <p id="user_warn" className="warn" style={{display: "none"}}>That username is taken</p>
                    </div>
                    <label htmlFor="username" >Username</label>
                    <input id="username" type="text" ></input>
                    <label htmlFor="">Password</label>
                    <input id="password" type="text"></input>
                    <input type="submit" value="Login"></input>
                </form>
            </Body>
        </html>
    )
}

module.exports = Login