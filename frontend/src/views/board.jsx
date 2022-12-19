import React, { Suspense, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useRef, useContext } from 'react'
import SuggestionPopup from './board_components/suggestionPopup'
import note from './items/note'
import '../styles/boardView.css'
import '../styles/items/default.css'
import itemTable from './items'
import { ResponseDefault } from 'utils'
import ErrorLoadingItem from './board_components/errorItem'
import ItemWrapper from './components/itemWrapper'
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
/*
On a more serious note, making these variables exist outside of components is beneficial to the fact
that they survive unmounting and will be scripted to avoid spending resources on useless re-rendering
*/
//Empty object that holds each item
let itemsList = {

}
//Empty object that contains pointers to items that have been 'removed'
let removedItems = {
    //Array the points to the removed items of this list
    undoQueue: [],
}
//Each item's content. Am i ignoring the React flow? Yes, i fucking am, i am so done rn about over thinking about my approach
export let itemStates = {}
//Contains the last visited board ID in this session since these variables are not removed when switching
export let currentID = null
//TODO Figure out how to make this page accessible offline - (WEB WORKERS)
//TODO Allow this page to be accessed without signing up. Use local storage to save board info for unregistered users
function Board() {
    let params = useParams()
    const container = useRef(null)
    const selection = useRef(null)
    const [renderItems, RenderItems] = useState([])
    //REMINDERS
    ////The element in focus
    ////document.activeElement
    useEffect(() => {
        currentID = params.boardId
        //TODO Load Board items here
        return () => { }
        let abortCtrl = new AbortController
        GetBoardItems(abortCtrl)
    }, [])
    async function GetBoardItems(abortCtrl) {
        //TODO Use local cache and check if any items need updating
        //TODO Finish this is general
        let res = fetch("/api/board", { signal: abortCtrl.signal }) //FIXME Endpoint
        let body = await res.json()
        let itemsArr = body.itemsArr
        //Load cloud items
        for (let i = 0; i < itemsArr.length; i++) {
            const item = itemsArr[i];
        }
        //Load cached items 
        let cachedItemsArr = []
        for (let i = 0; i < cachedItemsArr.length; i++) {
            const item = cachedItemsArr[i];
        }
    }
    //Modularize this, because it's gonna get heavy
    function eventHandler() {

    }
    function Zoom(event) {
        //TODO Make zoom focus on mouse location
        if (event.deltaY) container.current.style.transform = `scale(${zoom += (zoom / -event.deltaY) * 10})`
    }
    //General function for panning
    function PanEnd(event) {
        
    }
    function PanStart(event) {
        console.log(event)
        
    }
    function AddItem(name) {
        //TODO Warn client that item is not available
        if (itemImports[name] === undefined) {
            itemImports[name] = itemTable[name].import()
        }
        let Item = itemImports[name]
        let key = getKey()
        console.log(`Created ${name} item with key: ${key}`)
        let item = <WrapItem key={key} propkey={key} Item={Item}></WrapItem>
        itemsList[key] = item
        RenderItems(Object.values(itemsList))
    }
    function AddDefault(t) {   //Defaults to adding a note
        let key = getKey()
        RenderItems(renderItems.concat(<WrapItem key={key} Item={itemImports.note} data={t} />))
    }
    function RemoveItem(key) {
        let deleted = itemsList[key]
        removedItems[key] = itemsList[key]
        console.log(`Removed Item (${key}):`, itemsList[key])
        delete itemsList[key]
        RenderItems(Object.values(itemsList))
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
                <textarea id="fullscreen" draggable="true" /*onWheel={Zoom}*/ onMouseDown={PanStart} onMouseUp={PanEnd} onClick={Click} onChange={KeyDown}></textarea>
                <div id="itemContainer" ref={container} tabIndex={0} >
                    {renderItems}
                </div>
            </div>
            <SuggestionPopup setInput={SetChildInput} addItem={AddItem} addDefault={AddDefault}/>
        </div>
    )
    function WrapItem(data) {
        console.log(data)
        const [posData, setPosData] = useState({x:0,y:0})
        return (
            //Error boundary, Suspend lazy loaded react components, generic item wrapper
            <ErrorLoadingItem>
                <ItemWrapper removeSelf={() => RemoveItem(data.propkey)}>
                    <Suspense>
                        <data.Item data={data.data} removeSelf={() => RemoveItem(data.propkey)}/>
                    </Suspense>
                </ItemWrapper>
            </ErrorLoadingItem>
        )
    }
}

export default Board