import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { detectLeftMouseButton } from 'utils';
let offsetX = 0;
let offsetY = 0;
const getX = (event) => (event.clientX - window.innerWidth / 2)
const getY = (event) => (event.clientY - window.innerHeight / 2)

//Wrapper for items
export default function DragWrapper(data){
    const [isDraggable,setDraggable] = useState(true)
    const delayDelete = useRef(null)
    useEffect(()=>{
        console.log(data.removeItem)
        return () => {
            clearTimeout(delayDelete.current)
        }
    },[])
    //TODO Make undraggable when in focus
    function Drop(event){
        event.target.style.left = getX(event) - offsetX + "px"
        event.target.style.top = getY(event) - offsetY + "px"
    }
    function Pickup(event) {
        //document.activeElement.blur()
        offsetX = getX(event) - event.target.offsetLeft
        offsetY = getY(event) - event.target.offsetTop
    }
    function DeleteItem () { data.removeItem() };
    function DeleteClick(event) {
        if(detectLeftMouseButton(event))
        {
            delayDelete.current = setTimeout(DeleteItem, 750)
            event.currentTarget.classList.add("activate")}
    }
    function DeleteCancel(event) {
        clearTimeout(delayDelete.current)
        event.currentTarget.classList.remove("activate")
    }
    function StopDrag(e){
        DeleteCancel(e); e.preventDefault(); e.stopPropagation();
    }
    return(
    <div className="dragwrapper" draggable={isDraggable} /*onFocus={()=>setTimeout(() => setDraggable(false),200)} onBlur={()=>setDraggable(true)}*/ onDragStart={Pickup} onDragEnd={Drop}>
        {data.children}
        <div className='deleteItem' draggable="true" onDragStart={StopDrag} onMouseDown={DeleteClick} onMouseUp={DeleteCancel} onMouseLeave={DeleteCancel}>
            <div className='textbox' tabIndex={0} >
                <div>
                   <span className='hyperbole'>DELETE!!!</span> 
                </div>
                <span>Delete Item</span>
            </div>
        </div>
    </div>
    )
}