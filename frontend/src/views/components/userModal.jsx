import React from 'react'
import './quickOptions'

export default function UserModal(){
    return(
    <div id="userModal">
        <div>Welcome back</div>
        <div id="user_name">John Doe</div>
        <div id="pfp">Image</div>
        <div id="user_settings">
            <div id="user_settings_inner">
                <div id="foldout_icon">^</div>
                <div id="quick_options">
                    Hello World
                </div>
            </div>
        </div>
    </div>
    )
}