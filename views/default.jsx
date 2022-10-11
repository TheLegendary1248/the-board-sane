//This contains the boilerplate I've noticed to copy from page to page
const React = require('react')
const Nav = require('./nav.jsx')

function Default(param)
{
    return(
        <html>
            <head>
                <title>{param.title}</title>
                <link rel="stylesheet" href="styles.css" />
                <link rel="icon" type="image/png" href="favicon.png"/>
            </head>
            <body>
                <Nav></Nav>
                {param.children}
            </body>
        </html>
    )
}

module.exports = Default