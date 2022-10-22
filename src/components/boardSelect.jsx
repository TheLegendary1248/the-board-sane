//The board selection of the application
import React from 'react'
import Card  from './boardCard.jsx'
import '../styles/boardSelect.css'
//Container for boards.
let boardCont = <p>Getting boards...</p>

async function hello(){
    
}
//TODO Allow this page to be accessed without signing up. Use cookies to save board info for unregistered users
function BoardSelect(data)
{
    
    let boards = []
    /*
    //let get = await fetch("https://localhost:8000/board")
    let boards = data.boards.map(board => {
        return (
            <Card board={board}></Card>
        )
    })*/
    if (boards.length == 0) boards = <h3>You currently have no boards</h3>
    return(
        <div>
            <h1>Your Boards</h1>
            <div id="boardSelect">
                <p>Getting boards...</p>
            </div>
            
            <div id="addBoard">
                <h2 id="addHeader">Create a new Board</h2>
                <form method="POST" action="">
                    <label htmlFor="new_title" hidden={true}>New title of board</label>
                    <input name="name" id="new_title" type="text" placeholder="Board Title"/>
                    <label for="new_isOffline">Offline</label>
                    <input id="new_isOffline" type="checkbox"/>
                    <input id="create_new" type="submit" value="Create"/> 
                </form>
            </div>
        </div>
    )
}

export default BoardSelect