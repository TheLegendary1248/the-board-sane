//Component to render a note
import React from 'react'

//TODO Probably use value instead of inserting text within the element
export default function Note(data){
    import('../../styles/item/note.css')
    return(
    <div class="I_note" draggable="true" style={{width: data.width, height: data.height, resize: "both", overflow: "auto",}}>
        <label>
            <textarea placeholder='Title' rows='1' wrap='off' style={{position: "relative",width: "calc(100% - 10px)", height: "20px", resize:"none", whiteSpace:"nowrap", overflow:"hidden"}}>
                {data.title}
            </textarea>
        </label>
        <textarea placeholder='Type anything here!'style={{ width: "calc(100% - 10px)", height: "calc(100% - 45px)", resize:"none"}}>
            {data.text}
        </textarea>
    </div>
    )
}