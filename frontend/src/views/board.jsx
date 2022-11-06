import React from 'react'
import { useEffect, useRef } from 'react'
import SuggestionPopup from './board_components/suggestionPopup'
import Note from './items/note'
import '../styles/boardView.css'
import '../styles/items/default.css'
let zoom = 1;
///// The React view for the board page

//TODO Figure out how to make this page accessible offline - (WEB WORKERS)
//TODO Allow this page to be accessed without signing up. Use local storage to save board info for unregistered users
function Board() {

    const container = useRef(null)
    const selection = useRef(null)
    //REMINDERS
    //The element in focus
    //document.activeElement
    useEffect(() => {

    }, [])
    //Modularize this, because it's gonna get heavy
    function eventHandler() {

    }
    //document.addEventListener("keypress", () => console.log("Hello!"))
    function Zoom(event){
        if(event.deltaY) container.current.style.transform = `scale(${zoom += (zoom / -event.deltaY) * 10})`
    }
    function Pan(event){

    }
    return (
        <div id="R_board">
            <div id='ui_toolbar' hidden={true}>Placeholder for ui toolbar when I make that</div>
            <div id="focusLevel">
                Focus Level: Note
            </div>
            <div id="hint">
                Start typing or drawing
            </div>
            <div id="itemContainer" ref={container} tabIndex={0} onWheel={Zoom} onDrag={Pan}>
                <Note></Note>
                <Note></Note>
                <Note></Note>
            </div>
            <SuggestionPopup hidden={true}/>
        </div>
    )
}

export default Board