//The login/signup page of app. Ill make it dual-purpose
const React = require("React")
const Default = require("./default.jsx")

function Login() {
    return (
        <Default>
            <Nav></Nav>
            <h2>Login</h2>
            <p>Insert logging stuffs here.</p>
        </Default>
    )
}

module.exports = Login