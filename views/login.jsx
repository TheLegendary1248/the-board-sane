//The login/signup page of app. Ill make it dual-purpose
const React = require("React")
const Default = require("./default.jsx")

//TODO Add pattern matching
//TODO Reuse form for both login and register
//TODO Add "forgot password" 

function Login() {
    return (
        <Default>
            <h2>Login</h2>
            <p>Insert logging stuffs here.</p>
            <form method="POST" action="/api/login">
                <label htmlFor="username">Username</label>
                <input id="username" type="text"></input>
                <label htmlFor="">Password</label>
                <input id="password" type="text"></input>
                <input type="submit" value="Login"></input>
            </form>
        </Default>
    )
}

module.exports = Login