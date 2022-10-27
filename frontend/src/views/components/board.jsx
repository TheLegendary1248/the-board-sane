//The main purpose of the application
import React from 'react'

//TODO Figure out how to make this page accessible offline
//TODO Allow this page to be accessed without signing up. Use local storage to save board info for unregistered users
function Board()
{
    return(
        <html>
            <head>
                <title>INSERT BOARD NAME HERE</title>
            </head>
            <body>
                <div id="backgroundHint">
                    Start typing or drawing
                </div>
            </body>
        </html>
    )
}

export default Board