//Overall separate inner window that allows the user to modify their settings
//This file is not in 'components' due to it's size being noticeably much like it's own page
//It is also not it's own 
import { userContext } from "views/default"
import React, { useContext } from "react"
export default function UserProfile(data) {
    let user = useContext(userContext)

    return (
        <div id="edit_profile">
            <h2>{user?.name}</h2>
            <Dropdown label="User" desc="Things about you">
                <Input label="Display Name"></Input>
            </Dropdown>
            <Dropdown label="Settings" desc="Control over the app behaviour"></Dropdown>
            <Dropdown label="Theme" desc="Make it look how you want it to look">
                {/**This shows off the theme the user has chosen*/}
                <ThemeEx/>
            </Dropdown>
        </div>)
}

function Dropdown(data) {
    return (
        <div>
            <h3>{data.label ?? "unlabeled"}
                <span>- {data.desc ?? "undescribed"}</span></h3>
            <div>
                {data.children}
            </div>
        </div>
    )
}

function Input(data) {
    <div className="input_field">
        <label>{data.label ?? "unlabeled"}</label>
        <input type={data.type ?? "text"}></input>
    </div>
}

/**This is it's own function for the readability reasons */
function ThemeEx() {
    <div id="theme_ex">
        <div id="nav_ex">

        </div>
        <p></p>
    </div>
}