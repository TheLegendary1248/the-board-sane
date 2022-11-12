//Component to render a note
import React from 'react'
import DragWrapper from '../components/itemWrapper'

//TODO Probably use value instead of inserting text within the element
export default function Page(data) {
    import('../../styles/items/page.css')
    return (
        <DragWrapper>
            <div className="item i_page">
                <label>
                    <textarea className="title" placeholder='Title' rows='1' wrap='off' value={data.title}/>
                </label>
                <textarea className="body" placeholder='Type anything here!' value={data.text}/>
            </div>
        </DragWrapper>
    )
}