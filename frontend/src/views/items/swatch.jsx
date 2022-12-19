import React , { useRef, useState } from "react";
import { useEffect } from "react";
import ItemWrapper from "views/components/itemWrapper";
export default function Swatch(data)
{
    import('../../styles/items/swatch.css')
    const [color, SetColor] = useState("#00FF00")
    const divRef= useRef(null)
    const inputRef= useRef(null)
    function UpdateColor(event){
        let value = event.target.value
        divRef.current.style.backgroundColor = value
    }
    useEffect(()=> {
        inputRef.current.setSelectionRange(1,7)
    },[])
    return(
            <div className="item i_swatch" ref={divRef}>
                <input spellCheck="false" placeholder="Your color" ref={inputRef}className="value" defaultValue={color} onChange={UpdateColor} autoFocus/>
            </div>
    )
}