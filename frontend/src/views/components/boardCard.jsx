//A view card for the boards in board view
import React from 'react'

export default function BoardCard(board)
{
    //Ok react, this is beyond stupid

    if(board=={}) return( 
        <div className="boardCard">
            <h3><a href={board.board.id}>{board.board.title}</a></h3>
            <p style={{position:"relative",width:"80%", height:"80%"}}>
                I would give you some hint of whats here, but the app can't do that just yet
            </p>
        </div>
    )
    else return(
        <div>ERROR GETTING BOARD</div>
    )
}
