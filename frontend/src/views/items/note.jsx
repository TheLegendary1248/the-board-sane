//Component to render a note
import React from 'react'

//TODO Probably use value instead of inserting text within the element
export default function Note(data){
    import('../../styles/items/note.css')
    return(
    <div className="item i_page" draggable="true" style={{width: data.width, height: data.height}}>
        <textarea placeholder='Type anything here!'>
            {data.text}
        </textarea>
    </div>
    )
}