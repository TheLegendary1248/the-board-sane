//The main purpose of the application
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
            <Card board={{title:board.name}}></Card>
        )
    })
    if (boards.length == 0) boards = <h3>You currently have no boards</h3>
    return(
        <html>
        <DefHead title="Your Boards">
            
        </DefHead>
        <DefBody>
            {boards}
            <div id="addBoard" style={{position:"fixed", bottom: "50px", right:"50px", width:"100px", height: "100px"}}>
                Add Board
            </div>
        </DefBody>
        </html>
    )
}

module.exports = BoardSelect