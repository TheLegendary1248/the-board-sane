//The default head of a document
const React = require('react')

//TODO Add params for loading css
//Loads the default css style, favicon, along with title parameter
function Head(html)
{
    return(
        <head>
            <title>{html.title}</title>
            <link rel="stylesheet" href="styles/main.css" />
            <link rel="icon" type="image/png" href="favicon.png"/>
            {html.children}
        </head>
    )
}

module.exports = Head