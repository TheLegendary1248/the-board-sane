import React from 'react'
let offsetX = 0;
let offsetY = 0;
const getX = (event) => (event.clientX - window.innerWidth / 2)
const getY = (event) => (event.clientY - window.innerHeight / 2)

//Wrapper for items
export default function DragWrapper(data){
    //TODO Make draggable only on focus
    function Drop(event){
        event.target.style.left = getX(event) - offsetX + "px"
        event.target.style.top = getY(event) - offsetY + "px"
    }
    function Pickup(event) {
        offsetX = getX(event) - event.target.offsetLeft
        offsetY = getY(event) - event.target.offsetTop
    }
    return(
    <div className="dragwrapper" draggable="true" onDragStart={Pickup} onDragEnd={Drop}>
        {data.children}
        <div className='deleteItem'></div>
    </div>
    )
}