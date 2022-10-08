//About page of the website
const React = require("react")
const Nav = require("./nav.jsx")

function About()
{
    return(
        <html>
            <head>
                <title>About</title>
            </head>
            <body>
                <Nav></Nav>
                <h2>About</h2>
                <br></br>
                <p>Insert text about us</p>
                <p>Insert information about the whole project</p>
            </body>
        </html>
    )
}

module.exports = About