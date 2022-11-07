//Component to render a note
import React from 'react'
let offsetX = 0;
let offsetY = 0;
const getX = (event) => (event.clientX - window.innerWidth / 2)
const getY = (event) => (event.clientY - window.innerHeight / 2)
//TODO Probably use value instead of inserting text within the element
export default function Note(data){
    import('../../styles/items/note.css')
    //TODO Make draggable only on focus
    function Drop(event){
        console.log(event)
        event.target.style.left = getX(event) - offsetX + "px"
        event.target.style.top = getY(event) - offsetY + "px"
    }
    function Pickup(event) {
        console.log(event.target.offsetLeft)
        offsetX = getX(event) - event.target.offsetLeft
        offsetY = getY(event) - event.target.offsetTop
        console.log(offsetX, ";", offsetY)
    }
    return(
    <div className="item i_page" draggable="true" style={{width: data.width, height: data.height}} onDragStart={Pickup} onDragEnd={Drop}>
        <textarea placeholder='Type anything here!'>
            {data.text}
        </textarea>
    </div>
    )
}