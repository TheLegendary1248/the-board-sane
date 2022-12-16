//A view card for the boards in board view
import React from 'react'
import { Link } from 'react-router-dom'
import { GetTimestampFromID } from 'utils'

export default function BoardCard(data)
{   
    //console.log("Render Card",data)
    if(typeof data === 'object') return(
    <Link to={data.board._id}>
        <div
        className="boardCard" 
        style={{animation:`cardAnim 1s forwards ${(data.index ?? 1) / 15}s`}} 
        onAnimationEnd={e => e.target.style = `opacity:1;`}>
            <h3><span>{data.board.name}</span></h3>
            <p>Created on {GetTimestampFromID(data.board._id).toDateString()}</p>
            <p hidden style={{position:"relative",width:"80%", height:"80%"}}>
                App doesn't show previews of boards yet
            </p>
            <div>Delete</div>
            <div className='cardAttr'>
                <BoardAttrIcon icon="icons/cloud.svg" desc={"This board is saved on the cloud"}></BoardAttrIcon>
                <BoardAttrIcon icon="icons/database.svg" desc={"This board is saved locally"}></BoardAttrIcon>
            </div>
        </div>
    </Link> 
    )
    else return(
        <div className='boardCard'>
            <h3>ERROR GETTING BOARD</h3>
        </div>
    )
}
function BoardAttrIcon(data)
{
    return(
        <div className='tooltip'>
            <div className='desc'>{data.desc}</div>
            <object className='svg' data={data.icon} type="image/svg+xml"/>
        </div>
        
    )
}
