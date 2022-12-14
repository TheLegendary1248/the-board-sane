import React from 'react'
import './quickOptions'
import { userContext } from 'views/default'
import { useContext, useState } from 'react'
import UserProfile from 'views/userProfile'

export default function UserModal(data){
    let user = useContext(userContext)
    let [shown, showProfile] = useState(false)
    return(
    <div id="userModal">
        <div id="clickArea" onClick={() => showProfile(e => !e)}></div>
        <div id="greeting">Welcome back</div>
        <div id="user_name">{user?.name ?? "John Doe"}</div>
        <UserProfile shown={shown}/>
    </div>
    )
}