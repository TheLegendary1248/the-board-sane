//Autosetup of getting an element to respond to both click and enter
import { useRef, React } from 'react'
import { redirect } from 'react-router-dom';

//Pass this function in OnKeyUp
export function OnSubmit(event, callback){
    if(event.nativeEvent.keyCode === 13) { event.preventDefault(); callback(event);}
}

/**
 * Default actions to server responses
 * @param {Response} response 
 * @returns {Boolean} Whether or not the consuming code should continue with the request. Ex: Unauthorized, redirected to login page
 */
export function ResponseDefault(response){
    switch (response.status) {
        case 400:
            console.error("Client error on request")
            break;
        case 401: //Unauthorized, send to login page
            redirect('/login')
            return false;
        case 403: //Forbidden. Action unknown
            break;
        case 500: //Internal Server Error. 
            break;
    }
    return true;
}
/**
 * Gets the timestamp from a mongoDB object ID
 * @param {string} objectID A mongoose ObjectID
 * @returns {Date} The timestamp from the ID
 */
export function GetTimestampFromID(objectID) { return new Date(1000 * parseInt(objectID.slice(0,8), 16))} 
//TODO Find out type of document events and replace this
/**
 * Properly detects if an event is a left mouse click due to un standardization of mouse events
 * @param {*} event 
 * @returns {Boolean}
 */
export function detectLeftMouseButton(event) {
    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
        return false;
    } else if ('buttons' in event) {
        return event.buttons === 1;
    } else if ('which' in event) {
        return event.which === 1;
    } else {
        return (event.button == 1 || event.type == 'click');
    }
}