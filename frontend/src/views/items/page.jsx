//Component to render a note
import React from 'react'
import ItemWrapper from '../components/itemWrapper'

//TODO Probably use value instead of inserting text within the element
export default function Page(data) {
    import('../../styles/items/page.css')
    return (
            <div className="item i_page">
                <label>
                    <textarea spellCheck="false" className="title" placeholder='Title' rows='1' wrap='off' value={data.title}/>
                </label>
                <textarea spellCheck="false" className="body" placeholder='Type anything here!' value={data.text}/>
            </div>
    )
}