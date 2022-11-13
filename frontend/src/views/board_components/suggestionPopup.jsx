//The popup for the board view which suggests the items. Grammar 100
import { useEffect, useState, useRef } from "react";
import itemTable from "../items";
import Suggestion from "./itemSuggestion";
//A selection of words that'll direct the user to the guide
const helpWords = ["help","sos","guide","aid"]
//The last value the input field was. Used to detect if the user kept spelling or otherwise
let previousInput = ""

//Create a precomposed array of all the items and help conjoined and sorted
let precomposedArray = Object.keys(itemTable).concat(helpWords).sort((a, b) => a.localeCompare(b))
let arr = Array.from(precomposedArray)

export default function SuggestionPopup(data) {
    //The input field VALUE, not the element itself
    const [inputValue, setInputValue] = useState("")
    //Set the component visibility
    const [isHidden, setHidden] = useState(true)
    //The input field
    const inputField = useRef(null)
    
    //If the new input is just an addition of the previous, do not waste time re-reducing the whole array, again...
    function handleInputChange(e){
        //Force lowercase
        let input = e.target.value.toLowerCase()
        //Detect when the word is completed, and use the best suggestion
        if(input[input.length - 1] === ' ') 
        {
            input = input.trimEnd()
            let i = arr.indexOf(input)
            if(i !== -1) data.addItem(arr[i])
            else data.addDefault(input)
            setHidden(true)
            return
        }
        //If the new input is just an addition of the previous, do not waste time re-reducing the whole array again
        if(!input.includes(previousInput)) arr = Array.from(precomposedArray)
        //Filter
        arr = arr.filter(m => m.includes(input))
        //Set previous input value
        previousInput = input
        setInputValue(input)
    }
    function getFocus(text){ setHidden(false); inputField.current.value = text; }
    useEffect(()=> {
        console.log("Render")
        data.setInput.current = getFocus
    }, [])
    useEffect(()=> {
        if(!isHidden) inputField.current.focus()
    }, [isHidden])
    return(
    <div id="selectionPopup" hidden={isHidden}>
        <input id="selectInput" type="text" onChange={handleInputChange} ref={inputField} tabIndex={0}></input>
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