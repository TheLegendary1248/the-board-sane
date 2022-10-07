const React = require('react')
const Nav = require('./Nav')

function Main(html)
{
    return(
        <html>
            <head>
                <title>The Board</title>
                <link rel="stylesheet" href ="/styles.css"/>
            </head>
            <body>
                <p>Hello World</p>
                {html.children}
            </body>
        </html>
    )
}

module.exports = Main

