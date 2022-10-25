//The board selection of the application
import React, { useEffect, useRef } from 'react'
import Card from './components/boardCard.jsx'

//Container for boards.
let boardCont = <p>Getting boards...</p>

//TODO Allow this page to be accessed without signing up. Use cookies to save board info for unregistered users
function BoardSelect(data) {
    import('../styles/boardSelect.css')
    let boards = [<Card/>,<Card/>]
    let input = useRef(null);
    /*
    //let get = await fetch("https://localhost:8000/board")
    let boards = data.boards.map(board => {
        return (
            <Card board={board}></Card>
        )
    })*/
    if (boards.length == 0) boards = <h3>You currently have no boards</h3>
    return (
        <main id="R_select">
            <title>Your Boards</title>
            <h1 id="header">Your Boards</h1>
            <div id="boardSelect">
                {boards}
            </div>
            {/**Add two 'absolute' divs here, one to disappear on hover via css and vice versa*/}
            <div id="addBoard">
                <div id="onHover">
                    <h2 id="addHeader">Create a new Board</h2>
                    <form method="POST" action="">
                        <label htmlFor="new_title" hidden={true}>New title of board</label>
                        <input ref={input} name="name" id="new_title" type="text" placeholder="Board Title" />
                        <label htmlFor="new_isOffline">Offline</label>
                        <input id="new_isOffline" type="checkbox" />
                        <input id="create_new" type="submit" value="Create" />
                    </form>
                </div>
                <div id="offHover" onClick={() => input.current.focus()}>+</div>
            </div>
        </main>
    )
}

export default BoardSelect