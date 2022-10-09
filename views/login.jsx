//The login/signup page of app. Ill make it dual-purpose
const React = require("React")
const Nav = require('./nav.jsx')

function Login() {
    return (
        <html>
            <head>
                <title>Login</title>
                <link rel="stylesheet" href="styles.css" />

                {/*INCLUDE SCRIPT TO HANDLE LOGGING HERE*/}
            </head>
            <body>
                <Nav></Nav>
                <h2>Login</h2>
                <p>Insert logging stuffs here.</p>
            </body>
        </html>
    )
}

module.exports = Login