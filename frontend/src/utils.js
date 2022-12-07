//Autosetup of getting an element to respond to both click and enter
import { useRef, React } from 'react'
import { redirect } from 'react-router-dom';

//Pass this function in OnKeyUp
export function OnSubmit(event, callback){
    if(event.nativeEvent.keyCode === 13) { event.preventDefault(); callback(event);}
}

/**
 * Default actions to requests
 * @param {Response} response 
 * @returns {Boolean} Whether or not the consuming code should continue with the request. Ex: Unauthorized, redirected to login page
 */
export function ResponseDefault(response){
    switch (response.status) {
        case 400:
            console.log("Client error on request")
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