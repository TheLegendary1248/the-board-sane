//Component to render a note
import React from 'react'
import Wrapper from '../components/itemWrapper'
let offsetX = 0;
let offsetY = 0;
const getX = (event) => (event.clientX - window.innerWidth / 2)
const getY = (event) => (event.clientY - window.innerHeight / 2)
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