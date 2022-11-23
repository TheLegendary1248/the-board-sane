import React from 'react'

//This component should always be present and contain parts that do not rely on the document 
export default function Default(data) {
    let msg_500 = (<div>
        <p>The 'server' is sending back a 500's response. It appears it may be offline</p>
    </div>)
    let msg_400 = (<div>
        <p>The server has returned a 400 response. Please send the developer an angry email fully outlining why he sucks at coding</p>
        <p>Unless you the user are intentially sending the server requests outside the website's programming</p>
        <p>In which, please stop it</p>
    </div>)
    
    return(
        <div id="global">
            <div id="globalMessage"></div>
            <div id="cookieMessage">
                <p>We don't use third party cookies</p>
                <p>But we still use cookies in general</p>
                <p>
                    There is no accept button. The website needs to use cookies in order to function, and the incompetent programmer of the website
                    can't program the website to not to use them. If you do not want cookies, then discontinue use immediately. 
                    If you want physical cookies, here's a <a href=''>good recipe</a> :)
                </p>
            </div>
        </div>
    )   
}