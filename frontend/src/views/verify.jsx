import React, {useState, useRef, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
export default function Verify(data)
{
    import('../styles/verify.css')
    let {userID, token} = useParams();
    const [name, setName] = useState("Unknown");
    const [verified, verify] = useState(null)
    const [timeSinceRequest, setTimeSince] = useState(0)
    useEffect(()=>{
        let abortCtrl = new AbortController()        
        CheckVerification(abortCtrl)
        return () => {
            abortCtrl.abort("Verification page was navigated off before request completed")
        }
    }, [])
    async function CheckVerification(abort) {
        //Set interval to get show time passed
        let cancelInterval = setInterval(() => setTimeSince(prevCount => prevCount + 1),1000)
        //Catch any errors related to request, including abortion
        try {
            let req = await fetch("/api/login/verify", {method: "POST", signal: abort.signal, 
            body: JSON.stringify({userID, token, 
            serverOptions: {delay: 2500}
            }), headers: {'Content-Type': 'application/json'}})
            //The response should be text
            let res = await req.text()
            console.log("Response",res)
            //Set values accordingly. The response should be the user's name
            verify(!!res)
            setName(res)
            if(!!res) localStorage.setItem("Username",res)
        } catch (error) {
            console.warn(error)
        }
        //Clear timer function
        clearInterval(cancelInterval)
    }
    return(
        <div id="R_verify">
            <div id="verify_pending" hidden={!(verified === null)}>
                <h2>Verifying</h2>
                <p>Please give us a moment to get a response from the server</p>
                <p>Request sent {timeSinceRequest} seconds ago</p>
            </div>
            <div id="verify_succeed" hidden={!(verified === true)}>
                <h2><span className="border_underline">Welcome <span id="name">{name}</span></span></h2>
                <p>Your email has been verified, you're good to go!</p>
                <p><Link to="/board">Go To Boards</Link></p>
            </div>
            <div id="verify_fail" hidden={!(verified === false)}>
                <h2>Verification Failed</h2>
                <p>Check that the URL matches the link sent with the verification email</p>
                <p>Note: Verification links expire in 15 minutes</p>
            </div>
        </div>
    )
}