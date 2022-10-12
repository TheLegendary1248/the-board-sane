//This contains the boilerplate html of both the head and body
const React = require('react')
const Head = require('./defHead.jsx')
const Body = require('./defBody.jsx')

function Default(param)
{
    return(
        <html>
            <Head title={param.title}/>
            <Body>{param.children}</Body>
        </html>
    )
}

module.exports = Default