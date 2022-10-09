//Homepage of the website
const React = require('react')
const Nav = require('./nav.jsx')

function Home()
{
    return(
        <html>
            <head>
                <title>The Board</title>
                <link rel="stylesheet" href="styles.css"/>
            </head>
            <body>
                <Nav></Nav>

                <h1>the-board</h1>
                
            </body>
        </html>
    )
}

module.exports = Home

