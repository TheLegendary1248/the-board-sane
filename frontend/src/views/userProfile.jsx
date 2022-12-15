//Overall separate inner window that allows the user to modify their settings
//This file is not in 'components' due to it's size being noticeably much like it's own page
//It is also not it's own 
import { userContext } from "views/default"
import React, { useContext, useState } from "react"
import { useEffect } from "react"
export default function UserProfile(data) {

    import('../styles/profile.css')
    let user = useContext(userContext)
    useEffect(() => console.log("Rendered with val:", data.shown))
    return (
        <div id="edit_profile" className={data.shown ? "show" : ""}>
            <div id="scrollable">
                <div id="exit"/>
                <h2>{user?.name}</h2>
                <Dropdown label="User" desc="Things about you">
                    <Input label="Display Name"></Input>
                    <Input label="About Me"></Input>
                    <Input label="Display Name"></Input>
                </Dropdown>
                <Dropdown label="Settings" desc="Control over the app behaviour"></Dropdown>
                <Dropdown label="Theme" desc="Make it look how you want it to look">
                    {/**This shows off the theme the user has chosen*/}
                    <ThemeEx/>
                </Dropdown>
                <Dropdown label="Experimental" desc="Funny features that haven't made the cut yet">

                </Dropdown>
            </div>
        </div>)
}

function Dropdown(data) {
    let [isUnfolded, unfold] = useState(false)
    useEffect(() => {
        console.log(`Render ${data.label}!`)
    })
    return (
        <div className="dropdown">
            <div className="bar">
                <h3>{data.label ?? "unlabeled"}
                <span> - {data.desc ?? "undescribed"}</span></h3>
                <div className="button" onClick={() => unfold(!isUnfolded)}>Hello</div>
            </div>
            <div className={"content " + (isUnfolded ? "open" : "")}>
                {data.children}
            </div>
        </div>
    )
}

function Input(data) {
    return(
    <div className="input_field">
        <label>{data.label ?? "unlabeled"}</label>
        <input type={data.type ?? "text"}></input>
    </div>)
}

/**This is it's own function for the readability reasons */
function ThemeEx() {
    return(
    <div id="theme_ex">
        <div id="nav_ex">

        </div>
        <p></p>
    </div>)
}