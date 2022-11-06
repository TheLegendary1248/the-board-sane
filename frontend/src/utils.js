//Autosetup of getting an element to respond to both click and enter
import { useRef, React } from 'react'

//Pass this function in OnKeyUp
export function OnSubmit(event, callback){
    if(event.nativeEvent.keyCode === 13) { event.preventDefault(); callback(event);}
}