//Component to render a note
import React from 'react'
import Wrapper from '../components/itemWrapper'

//TODO Probably use value instead of inserting text within the element
export default function Note(data) {
    import('../../styles/items/note.css')
    return (
        <Wrapper>
            <textarea placeholder='Type anything here!'>
                {data.text}
            </textarea>
        </Wrapper>
    )
}