//The suggestions for the type of item you want on the board
import React from "react"
import { OnSubmit } from "../../utils"

export default function Suggestion(param)
{
    function Select(e){
        param.addItem(param.shorthand)
    }
    return(
        <div onClick={Select} onKeyUp={e => OnSubmit(e, Select)} tabIndex="0">
            <span>{param.shorthand}:</span> {param.desc}
        </div>
    )
}