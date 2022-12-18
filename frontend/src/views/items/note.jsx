//Component to render a note
import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import DragWrapper from '../components/itemWrapper'

//TODO Probably use value instead of inserting text within the element
export default function Note(data) {
    import('../../styles/items/note.css')
    const textRef = useRef(null)
    useEffect(()=>{
        let pt = textRef.current.value.length + 1
        textRef.current.setSelectionRange(pt,pt)
    },[])
    return (
        <DragWrapper removeItem={data.removeSelf}>
            <textarea ref={textRef} spellCheck="false" className='item i_note' placeholder='Type anything here!' defaultValue={data.text} autoFocus>
            </textarea>
        </DragWrapper>
    )
}