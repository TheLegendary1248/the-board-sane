//The board selection of the application
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import Card from './components/boardCard.jsx'

//Container for boards.
let boardCont = <p>Getting boards...</p>

//TODO Allow this page to be accessed without signing up. Use cookies to save board info for unregistered users
function BoardSelect(data) {
    import('../styles/boardSelect.css')
    let [boards, setBoards] = useState((<p>Loading boards, please give us a moment</p>))
    const inputElement = useRef(null);
    /*
    //let get = await fetch("https://localhost:8000/board")
    let boards = data.boards.map(board => {
        return (
            <Card board={board}></Card>
        )
    })*/
    async function GetBoards(abortCtrl) {
        //Fetch request
        let req = await fetch("/api/board",  {signal: abortCtrl.signal})
        let res = await req.json()
        if(req.ok)
        {   //If the request succeeds
            try{
                setBoards(Object.keys(res).length === 0 ? (<p>You currently have no boards</p>) : boards.map(board => (<Card board={board}></Card>)))
            }
            catch (error)
            {   //Error caught while displaying the boards. Not a server error
                setBoards(<p>An error occurred while displaying boards<br/>This is not a server error, please message the developer about this error<br/>{error.toString()}</p>)
            }
        }
        else if(req.status === 403){
            setBoards(<p>You are not signed in</p>)
        }
        console.log(res)
    }
    async function CreateNewBoard(event) {
        //Stop normal form submition
        event.preventDefault();
        console.log(new FormData(event.target).get("name"))
        let req = await fetch("/api/board", {
            method: 'POST',
            headers: {
                //Note: FormData is .json, lovely aint it?
                'Content-Type': "text/plain"
            },
            body: new FormData(event.target).get("name")
        })
        let res = await req.json()
        console.log("response:",await res)
    }
    useEffect(() => {
        //Abort controller for cancelling the request if the page is left early
        let abortCtrl = new AbortController()
        GetBoards(abortCtrl)
    }, [])
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
                    <form method="POST" action="/api/board" onSubmit={CreateNewBoard}>
                        <label htmlFor="new_title" hidden={true}>New title of board</label>
                        <input ref={inputElement} name="name" id="new_title" type="text" placeholder="Board Title" />
                        <br/>
                        <label id="offline_label" htmlFor="new_isOffline">Offline</label>
                        <input id="new_isOffline" type="checkbox" />
                        <input id="create_new" type="submit" value="Create" />
                    </form>
                </div>
                <div id="offHover" onClick={() => inputElement.current.focus()}>+</div>
            </div>
        </main>
    )
}

export default BoardSelect