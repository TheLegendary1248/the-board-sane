//This contains the boilerplate head html
import React from 'react' 
import Nav from './nav.jsx'

//For now, this only puts the navbar with every page
function Body(html) {
    return (
        <body>
            <Nav></Nav>
            {html.children}
        </body>
    )
}

export default Body