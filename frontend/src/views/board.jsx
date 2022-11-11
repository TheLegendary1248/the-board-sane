import React, { useState } from 'react'
import { useEffect, useRef } from 'react'
import SuggestionPopup from './board_components/suggestionPopup'
import note from './items/note'
import '../styles/boardView.css'
import '../styles/items/default.css'
import itemTable from './items'
let offsetX = 0;
let offsetY = 0;
const getX = (event) => (event.clientX - window.innerWidth / 2)
const getY = (event) => (event.clientY - window.innerHeight / 2)
let zoom = 1;
///// The React view for the board page
let itemImports = {
    'note': itemTable.note.import() 
};
//TODO Figure out how to make this page accessible offline - (WEB WORKERS)
//TODO Allow this page to be accessed without signing up. Use local storage to save board info for unregistered users
function Board() {

    const container = useRef(null)
    const selection = useRef(null)
    const [items, setItems] = useState([])
    //REMINDERS
    ////The element in focus
    ////document.activeElement
    useEffect(() => {
        
    }, [])
    //Modularize this, because it's gonna get heavy
    function eventHandler() {

    }
    //document.addEventListener("keypress", () => console.log("Hello!"))
    function Zoom(event) {
        //TODO Make zoom focus on mouse location
        if (event.deltaY) container.current.style.transform = `scale(${zoom += (zoom / -event.deltaY) * 10})`
    }
    function Pan(event) {
    }
    function PanStart(event) 
    {
        console.log(event)
        // event.dataTransfer.setDragImage({}, 0,0)
    }
    function AddItem(name) {
        if(itemImports[name] === undefined)
        {
            itemImports[name] = itemTable[name].import()
        }
        let Item = itemImports[name]
        setItems(items.concat(<Item/>))
    }
    function RemoveItems(){

    }
    function Click(event) {

    }
    //On key down with the board in focus, detect input 
    function KeyDown(event) {
        SetChildInput.current(event.target.value)
    }
    const SetChildInput = useRef(null)
    return (
        <div id="R_board">
            <div id='ui_toolbar' hidden={true}>Placeholder for ui toolbar when I make that</div>
            <div id="focusLevel">
                Focus Level: Note
            </div>
            <div id="hint">
                Start typing or drawing
            </div>
            {/*Used to center the board screen*/}
            <div id="center">
                <textarea id="fullscreen" draggable="true" onWheel={Zoom} onDragStart={PanStart} onDrag={Pan} onClick={Click} onChange={KeyDown}></textarea>
                <div id="itemContainer" ref={container} tabIndex={0} >
                    {items}
                </div>
            </div>
            <SuggestionPopup setInput={SetChildInput} addItem={AddItem}/>
        </div>
    )
}

export default Board