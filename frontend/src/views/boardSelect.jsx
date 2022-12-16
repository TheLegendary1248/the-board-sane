//The board selection of the application
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ResponseDefault, GetTimestampFromID } from 'utils.js'
import BoardCard from './components/boardCard.jsx'
import Card from './components/boardCard.jsx'

//Container for boards.
let boardCont = <p>Getting boards...</p>
//List of both local and cloud boards
let boardList = []

//TODO Allow this page to be accessed without signing up. Use cookies to save board info for unregistered users
function BoardSelect(data) {
    import('../styles/boardSelect.css')
    let navigate = useNavigate()
    //The unchanged board list //TODO Load boards from local DB

    //The list to be rendered
    let [renderList, setRenderList] = useState(null)

    let [boards, setBoards] = useState((<p>Loading boards, please give us a moment</p>))
    const inputElement = useRef(null);
    /*
    //let get = await fetch("https://localhost:8000/board")
    let boards = data.boards.map(board => {
        return (
            <Card board={board}></Card>
        )
    })*/
    //Sorts the boardList into the RenderList State
    function RenderList(sortMethod) {
        //Create an array of numbers that serve as pointers to the boardList
        let arr = [...Array(boardList.length).keys()]
        switch (sortMethod) {
            case "name": //Name
                arr.sort((a, b) => boardList[a].name.localeCompare(boardList[b].name));
                break;
            case "date": //Date from timestamp in given mongoDB timestamp
                arr.sort((a, b) => boardList[a].creationDate > boardList[b].creationDate ? -1 : 1)
                break;
            case "last modified": //Last modification date of board
                throw "wtf"
                break;
            case "save location": //Save location of the board
                throw "wtf"
                break;
            default:
                throw `RenderList sort method "${sortMethod} is not valid"`
        }
        //We provide the index as well to properly set styling for animation
        let elements = arr.map((e, i) => <Card key={e} board={boardList[e]} index={i}></Card>)
        setRenderList(elements)
    }
    //Called on mount to retrieve boards //TODO Send locally cached board ID's
    async function GetBoards(abortCtrl) {
        //Fetch request
        let res = await fetch("/api/board", { signal: abortCtrl.signal })
        let body = await res.json()
        //Precalculate creation dates on client side from ID
        body.forEach((board, index, arr) => { arr[index].creationDate = GetTimestampFromID(board._id) })
        boardList = body
        if (res.ok) {   //If the request succeeds
            try {
                RenderList("name")
            }
            catch (error) {   //Error caught while displaying the boards. Not a server error
                console.error(error)
                setRenderList(<p>An error occurred while displaying boards<br />This is not a server error, please message the developer about this error<br />{error.toString()}</p>)
            }
        }
        else if (res.status === 403) {
            setRenderList(<p>You are not signed in</p>)
        }
    }
    async function CreateNewBoard(event) {
        //Stop normal form submition
        event.preventDefault()
        console.log(new FormData(event.target).get("name"))
        //Since we want it to be just a new board and we don't have special settings, create as is
        let res = await fetch("/api/board", {
            method: 'POST',
            headers: {
                'Content-Type': "text/plain"
            },
            body: new FormData(event.target).get("name")
        })
        if (!ResponseDefault(res)) return;
        if (res.ok) {
            navigate(("/board/" + await res.text()))
        }
        //TODO Fail condition for creating a new board
        else return;
    }
    useEffect(() => {   //Abort controller for cancelling the request if the page is left early
        let abortCtrl = new AbortController()
        GetBoards(abortCtrl)
    }, [])
    if (boards.length == 0) boards = <h3>You currently have no boards</h3>
    return (
        <main id="R_select">
            <title>Your Boards</title>
            <h1 id="header">Your Boards
                <span id="sort">
                    <label>by</label>
                    <select onChange={e => RenderList(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="date">Date</option>
                        <option value="last modified" hidden>Last Modified</option>
                        <option valud="save location" hidden>Save Location</option>
                    </select>
                </span>
            </h1>
            {/**Add two 'absolute' divs here, one to disappear on hover via css and vice versa*/}
            <div id="addBoard">
                <div id="onHover">
                    <h2 id="addHeader">Create a new Board</h2>
                    <form method="POST" action="/api/board" onSubmit={CreateNewBoard}>
                        <label htmlFor="new_title" hidden={true}>New title of board</label>
                        <input ref={inputElement} name="name" id="new_title" type="text" placeholder="Board Title" />
                        <br />
                        <label id="offline_label" htmlFor="new_isOffline">Offline</label>
                        <input id="new_isOffline" type="checkbox" />
                        <input id="create_new" type="submit" value="Create" />
                    </form>
                </div>
                <div id="offHover" onClick={() => inputElement.current.focus()}>+</div>
            </div>
            <div id="boardSelect">
                {renderList}
            </div>
            
        </main>
    )
}

export default BoardSelect