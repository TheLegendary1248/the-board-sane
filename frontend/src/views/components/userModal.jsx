import React from 'react'
import './quickOptions'
import { userContext } from 'views/default'
import { useContext } from 'react'

export default function UserModal(data){
    let user = useContext(userContext)
    return(
    <div id="userModal">
        <div>Welcome back</div>
        <div id="user_name">{user?.name ?? "John Doe"}</div>
    </div>
    )
}