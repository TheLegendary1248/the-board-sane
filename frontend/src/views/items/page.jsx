//Component to render a note
import React from 'react'
import Wrapper from '../components/itemWrapper'

//TODO Probably use value instead of inserting text within the element
export default function Page(data) {
    import('../../styles/items/page.css')
    return (
        <Wrapper>
            <label>
                <textarea placeholder='Title' rows='1' wrap='off' value={data.title}/>
            </label>
            <textarea placeholder='Type anything here!' value={data.text}/>
        </Wrapper>
    )
}