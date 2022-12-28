import React, { Fragment, createContext, useState, useEffect, useContext } from 'react'
import LocalStore from 'scripts/localStore'
//This component serves as the top parent node for all components 
//User prefs, cloud synced if logged in, local if not
const userPrefsContext = createContext(null)
//Details of the user object in cloud
const userContext = createContext(null)
//If the user is on mobile or not
const isMobile = createContext(null)

export default function Default(data) {
    const [userState, setUserState] = useState(null)
    useEffect(() => {
        let name = LocalStore.username
        if(name) setUserState({ name })
        let abortCtrl = new AbortController()
        CheckCredentials(abortCtrl)
        return () => abortCtrl.abort()
    }, [])
    //Checks credentials on website load
    async function CheckCredentials(abortCtrl) 
    {   //Set up headers
        let options = { signal: abortCtrl.signal, headers: { } }
        Object.assign(options, {'If-Modified-Since': LocalStore.userprofileUpdateTime})
        //Check with server about login
        let req = await fetch("/api/login/", options)
        console.log(req)
        if (req.status === 304) 
        {   //User credentials match, and the user's profile has not changed
            setUserState({name: LocalStore.username})
        }
        else if(req.ok)
        {   //User credentials match, show we're logged in
            let res = await req.text()
            setUserState({name: res})
            LocalStore.userprofile = res
        }
        else
        {   //All else has failed
            setUserState(null)
        }
    }
    /*
    let msg_500 = (<div>
        <p>The 'server' is sending back a 500's response. It appears it may be offline</p>
    </div>)
    let msg_400 = (<div>
        <p>The server has returned a 400 response. Please send the developer an angry email fully outlining why he sucks at coding</p>
        <p>Unless you the user are intentially sending the server requests outside the website's programming</p>
        <p>In which, please stop it</p>
    </div>) */

    return (
        <Fragment>
            <userPrefsContext.Provider value={true}>
                <userContext.Provider value={userState}>
                    {data.children}
                </userContext.Provider>
            </userPrefsContext.Provider>
            <div id="global" hidden={true}>
                <div id="globalMessage"></div>
                <div id="cookieMessage">
                    <p>We don't use third party cookies</p>
                    <p>But we still use cookies in general</p>
                    <p>
                        There is no accept button. The website needs to use cookies in order to function, and the incompetent programmer of the website
                        can't program the website to not to use them. If you do not want cookies, then discontinue use immediately.
                        If you want physical cookies, here's a <a href='https://minecraft.fandom.com/wiki/Cookie#Crafting'>good recipe</a> :)
                    </p>
                </div>
            </div>
        </Fragment>
    )
}
export { userContext, userPrefsContext }