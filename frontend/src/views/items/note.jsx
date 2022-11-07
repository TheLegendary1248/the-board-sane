//Component to render a note
import React from 'react'

//TODO Probably use value instead of inserting text within the element
export default function Note(data){
    import('../../styles/items/note.css')
    //TODO Make draggable only on focus
    function Drop(event){
        console.log(event)
        event.target.style.top = (event.clientY - window.innerHeight / 2) + "px"
        event.target.style.left = (event.clientX - window.innerWidth / 2) + "px"
    }
    return(
    <div className="item i_page" draggable="true" style={{width: data.width, height: data.height}} onDragEnd={Drop}>
        <textarea placeholder='Type anything here!'>
            {data.text}
        </textarea>
    </div>
    )
}