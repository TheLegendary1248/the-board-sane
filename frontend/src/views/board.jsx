//The main purpose of the application
import React from 'react'
import { useRef } from 'react'
import '../styles/boardView.css'

//TODO Figure out how to make this page accessible offline
//TODO Allow this page to be accessed without signing up. Use local storage to save board info for unregistered users
function Board()
{
    const container = useRef(null)
    const selection = useRef(null)
    document.addEventListener("keypress", () => console.log("Hello!"))
    return(
        <div id="R_board">
            <div id="hint">
                Start typing or drawing
            </div>
            <div id="contentContainer" ref={container}>

            </div>
            <div id="selectionPopup">
                <input id="selectInput" type="text"></input>
                <div id="selectContent">
                    <div>
                        <span>note:</span> A standard note
                    </div>
                    <div>
                        <span>timer:</span> A clock that ticks down
                    </div>
                    <div>
                        <span>path:</span> A line that connects to pieces of content
                    </div>
                    <div>
                        <span>table:</span> A table. Legs not included
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Board