//A view card for the boards in board view
const React = require('react')


function BoardCard(board)
{
    //Ok react, this is beyond stupid
    return(
        <div className="boardCard" style={{position:"relative",width: "200px", height: "200px", display: "inline-block", boxSizing: "border-box", overflow: 'hidden', border: "2px solid grey"}}>
            <h3><a href={board.board.id}>{board.board.title}</a></h3>
            <p style={{position:"relative",width:"80%", height:"80%"}}>
                I would give you some hint of whats here, but the app can't do that just yet
            </p>
        </div>
    )
}

module.exports = BoardCard