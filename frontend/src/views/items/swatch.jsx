import React , { useRef, useState } from "react";
import DragWrapper from "views/components/itemWrapper";
export default function Swatch(data)
{
    import('../../styles/items/swatch.css')
    const [color, SetColor] = useState("#00FF00")
    const divRef= useRef(null)
    function UpdateColor(event){
        let value = event.target.value
        divRef.current.style.backgroundColor = value
    }
    return(
        <DragWrapper>
            <div className="item i_swatch" ref={divRef}>
                <input placeholder="forestgreen" className="value" defaultValue={color} onChange={UpdateColor}/>
            </div>
        </DragWrapper>
    )
}