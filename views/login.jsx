//The login/signup page of app. Ill make it dual-purpose
const React = require("React")
const Head = require("./defHead.jsx")
const Body = require("./defBody.jsx")
require('dotenv').config()
//TODO Add pattern matching
//TODO Add "forgot password"

function Login() {

    return (
        <html>
            <Head title="Login">
                <script rel="text/javascript" src={process.env.ROOT_URL + 'scripts/login.js'} defer></script>
            </Head>
            <Body>
                <h2 id="header">Login</h2>
                <form id="form" method="POST" action="/api/login">
                    <div>
                        <p id="user_ok" className="ok" style={{display: "none"}}>That username is available</p>
                        <p id="user_warn" className="warn" style={{display: "none"}}>That username is taken</p>
                        <label htmlFor="username" >Username</label>
                        <br/>
                        <input id="username" type="text" placeholder="What do you like to go by?" required/>
                    </div>
                    <div>
                        <p id="user_pass_warn"></p>
                        <label htmlFor="password" >Password</label>
                        <br/>
                        <input id="password" type="password" placeholder="Make sure it's a strong password" required/>
                        <span id="show_pass">Show</span>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="email">Email</label>
                        <br/>
                        <input id="email" type="email" placeholder="Ex: hello@example.com - only required to register"/>
                    </div>
                    <br/>
                    <input id="submit_form" type="submit" value="Login"></input>
                </form>
            </Body>
        </html>
    )
}

module.exports = Login