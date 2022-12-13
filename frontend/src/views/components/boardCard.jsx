//A view card for the boards in board view
import React from 'react'
import { Link } from 'react-router-dom'
import { GetTimestampFromID } from 'utils'

export default function BoardCard(data)
{   
    console.log("Render Card",data)
    if(typeof data === 'object') return(
    <Link to={data.board._id}>
        <div className="boardCard">
            <h3><span>{data.board.name}</span></h3>
            <p style={{'font-size': '12px'}}>Created on {GetTimestampFromID(data.board._id).toDateString()}</p>
            <p hidden style={{position:"relative",width:"80%", height:"80%"}}>
                App doesn't show previews of boards yet
            </p>
            <div className='cardAttr'>
                <svg>
                    <use xlinkHref='icons/cloud.svg' style={{fill: "#fff"}}></use>
                </svg>
                <object className='svg' data='icons/cloud.svg' type="image/svg+xml" height="30px" width="30px" ></object>
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
    
}
