import React, { Suspense, useState } from 'react'
import { useEffect, useRef } from 'react'
import SuggestionPopup from './board_components/suggestionPopup'
import note from './items/note'
import '../styles/boardView.css'
import '../styles/items/default.css'
import itemTable from './items'
//Panning
let offsetX = 0;
let offsetY = 0;
const getX = (event) => (event.clientX - window.innerWidth / 2)
const getY = (event) => (event.clientY - window.innerHeight / 2)
//Experimental for now
let zoom = 1;
//Dictionary for importing react components for React
let itemImports = {};
//Counter to serve as a key generator
let counter = 0;
let getKey = () => counter++;
//Empty object that holds each item
let itemsList = {}
//Empty object that contains pointers to items that have been 'removed'
let removedItems = {}
//TODO Figure out how to make this page accessible offline - (WEB WORKERS)
//TODO Allow this page to be accessed without signing up. Use local storage to save board info for unregistered users
function Board() {

    const container = useRef(null)
    const selection = useRef(null)
    const [renderItems, RenderItems] = useState([])
    //REMINDERS
    ////The element in focus
    ////document.activeElement
    useEffect(() => {
        //TODO Load Board items here
        
    }, [])
    //Modularize this, because it's gonna get heavy
    function eventHandler() {

    }
    function Zoom(event) {
        //TODO Make zoom focus on mouse location
        if (event.deltaY) container.current.style.transform = `scale(${zoom += (zoom / -event.deltaY) * 10})`
    }
    //General function for panning
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
        let key = getKey()
        renderItems[key] = <Suspense key={++counter}><Item/></Suspense>
        RenderItems(renderItems.concat(<Suspense key={++counter}><Item/></Suspense>))
    }
    //Defaults to adding a note
    function AddDefault(t) { RenderItems(renderItems.concat(<Suspense key={++counter}><itemImports.note text={t} /></Suspense>))}
    function RemoveItem(){

    }
    function Click(event) {

    }
    //On key down with the board in focus, detect input 
    function KeyDown(event) {
        SetChildInput.current(event.target.value)
        event.target.value = ""
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
                    {renderItems}
                </div>
            </div>
            <SuggestionPopup setInput={SetChildInput} addItem={AddItem} addDefault={AddDefault}/>
        </div>
    )
}

export default Board