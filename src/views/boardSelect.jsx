//The board selection of the application
import React, { useEffect, useRef } from 'react'
import Card from './components/boardCard.jsx'

//Container for boards.
let boardCont = <p>Getting boards...</p>

async function hello() {

}
//TODO Allow this page to be accessed without signing up. Use cookies to save board info for unregistered users
function BoardSelect(data) {
    let m;
    import('../styles/boardSelect.css').then((e) => { m = e.default; console.log("Vars:", m, e) })
    let boards = []
    let input = useRef(null);
    /*
    //let get = await fetch("https://localhost:8000/board")
    let boards = data.boards.map(board => {
        return (
            <Card board={board}></Card>
        )
    })*/
    useEffect(() => {
        return () => { console.log("Before:", m); m = null; console.log("After:", m); }
    }, [])
    if (boards.length == 0) boards = <h3>You currently have no boards</h3>
    return (
        <div id="R_select">
            <h1>Your Boards</h1>
            <div id="boardSelect">
                <p>Getting boards...</p>
            </div>
            {/**Add two 'absolute' divs here, one to disappear on hover via css and vice versa*/}
            <div id="addBoard">
                <div id="onHover">
                    <h2 id="addHeader">Create a new Board</h2>
                    <form method="POST" action="">
                        <label htmlFor="new_title" hidden={true}>New title of board</label>
                        <input ref={input} name="name" id="new_title" type="text" placeholder="Board Title" />
                        <label for="new_isOffline">Offline</label>
                        <input id="new_isOffline" type="checkbox" />
                        <input id="create_new" type="submit" value="Create" />
                    </form>
                </div>
                <div id="offHover" onClick={() => input.current.focus()}>+</div>
            </div>
        </div>
    )
}

export default BoardSelect