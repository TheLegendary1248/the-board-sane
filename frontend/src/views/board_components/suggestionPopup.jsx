//The popup for the board view which suggests the items. Grammar 100
import { useEffect, useState } from "react";
import itemTable from "../items";
import Suggestion from "./itemSuggestion";
const words = ["help","sos","guide","aid"]
let prevInput = ""

let precomposedArray = Object.keys(itemTable).concat(words).sort((a, b) => a.localeCompare(b))
let arr = Array.from(precomposedArray)

export default function SuggestionPopup() {
    const [input, setInput] = useState("")
    //If the new input is just an addition of the previous, do not waste time re-reducing the whole array, again...
    function handleInputChange(e){
        //Force lowercase
        let input = e.target.value.toLowerCase()
        //Detect when the word is completed, and use the best suggestion
        if(input[input.length - 1] === ' ') 
        {
            
            console.warn("Suggestion exit function non-existent")
        }
        //If the new input is just an addition of the previous, do not waste time re-reducing the whole array again
        if(!input.includes(prevInput)) arr = Array.from(precomposedArray)
        //Filter
        arr = arr.filter(m => m.includes(input))
        //Set previous input value
        prevInput = input
        setInput(input)
    }
    useEffect(()=> {
    }, [input])
    return(
    <div id="selectionPopup">
        <input id="selectInput" type="text" onChange={handleInputChange}></input>
        <div id="selectItem" tabIndex={-1}>
        {
            arr.map((key) => 
            {
                let item = itemTable[key];
                return <Suggestion key={key} shorthand={key} desc={item?.desc ?? "A guide to using the website"} ishelp/> 
            })
        }
        </div>
        {/**This is for when I take over the accessbility features */}
        <div id="suggestionEscapeHint" hidden={true}>Press <kbd>Esc</kbd> to exit suggestions</div>
    </div>
    )
}