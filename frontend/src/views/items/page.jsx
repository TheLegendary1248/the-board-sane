//Component to render a note
import React from 'react'

//TODO Probably use value instead of inserting text within the element
export default function Note(data){
    import('../../styles/items/page.css')
    return(
    <div class="item i_page" draggable="true" style={{width: data.width, height: data.height}}>
        <label>
            <textarea placeholder='Title' rows='1' wrap='off'>
                {data.title}
            </textarea>
        </label>
        <textarea placeholder='Type anything here!'>
            {data.text}
        </textarea>
    </div>
    )
}