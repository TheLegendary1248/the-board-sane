//Overall separate inner window that allows the user to modify their settings
//This file is not in 'components' due to it's size being noticeably much like it's own page
//It is also not it's own 
import { userContext } from "views/default"
import React, { useContext, useState, useEffect, useRef} from "react"

export const userOptions = {
    dragSetting: {
        type: "distance",
        value: "100"
    },
}

export default function UserProfile(data) {

    import('../styles/profile.css')
    let user = useContext(userContext)
    return (
        <div id="edit_profile" className={data.shown ? "show" : ""}>
            <div id="scrollable">
                <div id="exit"/>
                <h2>{user?.name}</h2>
                <Dropdown label="User" desc="Things about you">
                    <Input label="Display Name"></Input>
                    <Input label="About Me"></Input>
                </Dropdown>
                <Dropdown label="Settings" desc="Control over the app behaviour">
                    <Input label="Time to delete an item" inputattr={{type:"number",min:0,step:0.05}}/>
                    <SelectInput
                        label={"Enter drag by "}
                        options={{
                            "Distance":(<div>distance</div>),
                            "Time":(<div>time</div>),
                        }}>
                    </SelectInput>
                </Dropdown>
                <Dropdown label="Theme" desc="Make it look how you want it to look">
                    {/**This shows off the theme the user has chosen*/}
                    <Input label="Primary Color" inputattr={{type:"color"}}></Input>
                    <Input label="Secondary Color" inputattr={{type:"color"}}></Input>
                    <Input label="Highlight Color" inputattr={{type:"color"}}></Input>
                    <Input label="Readable Font"></Input>
                    <Input label="Stand-out Font"></Input>
                    <ThemeEx/>
                </Dropdown>
                <Dropdown label="Experimental" desc="Funny features that haven't made the cut yet">

                </Dropdown>
            </div>
        </div>)
}

function Dropdown(data) {
    let [isUnfolded, unfold] = useState(false)
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
function SelectInput (data) {
    let mappedOptions = useRef(null)
    const [selection,setSelection] = useState(Object.entries(data.options)[0][0])
    return(
        <React.Fragment>
        <label>{data.label ?? "Label"}</label>
        <select onChange={e => setSelection(e.target.value)}>
            {Object.keys(data.options).map(key => <option key={key}>{key}</option>)}
        </select>
        {data.options[selection]}   
        </React.Fragment>
        
    )
}
function Input(data) {
    return(
    <div className="input_field">
        <label>{data.label ?? "unlabeled"}</label>
        <input {...data.inputattr}></input>
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