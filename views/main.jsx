const React = require('react')
const Nav = require('./nav.jsx')

function Main(html)
{
    return(
        <html>
            <head>
                <title>The Board</title>
                <script type="text/javascript">
                    console.log("Hello")
                </script>
                <link rel="stylesheet" href="styles.css"/>
            </head>
            <body>
                <Nav></Nav>

                <p>Hello World</p>
                {html.children}
            </body>
        </html>
    )
}

module.exports = Main

