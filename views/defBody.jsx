//This contains the boilerplate head html
const React = require('react')
const Nav = require('./nav.jsx')

//For now, this only puts the navbar with every page
function Body(html) {
    return (
        <body>
            <Nav></Nav>
            {html.children}
        </body>
    )
}

module.exports = Body