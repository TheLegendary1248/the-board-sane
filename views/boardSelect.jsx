//The board selection of the application
const React = require("React")
const Card = require("./boardCard.jsx")
const Default = require("./default.jsx")
const DefBody = require("./defBody.jsx")
const DefHead = require("./defHead.jsx")
//import '../src/styles/selection.css'

//TODO Allow this page to be accessed without signing up. Use cookies to save board info for unregistered users
function BoardSelect(data)
{
    let boards = data.boards.map(board => {
        return (
            <Card board={board}></Card>
        )
    })
    if (boards.length == 0) boards = <h3>You currently have no boards</h3>
    return(
        <html>
        <DefHead title="Your Boards">
            <link rel="stylesheet" href="styles/boardSelect.css"/>
        </DefHead>
        <DefBody>
            <h1>Your Boards</h1>
            <div id="boardSelect">
                {boards}
            </div>
            
            <div id="addBoard">
                <h2 id="addHeader">Create a new Board</h2>
                <form method="POST" action="">
                    <label for="new_title" hidden={true}>New title of board</label>
                    <input name="name" id="new_title" type="text" placeholder="Board Title"/>
                    <label for="new_isOffline">Offline</label>
                    <input id="new_isOffline" type="checkbox"/>
                    <input id="create_new" type="submit" value="Create"/> 
                </form>
            </div>
        </DefBody>
        </html>
    )
}

module.exports = BoardSelect