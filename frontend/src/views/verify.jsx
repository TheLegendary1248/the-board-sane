import React, {useState, useRef, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
export default function Verify(data)
{
    import('../styles/verify.css')
    let {userID, token} = useParams();
    const [name, setName] = useState("Unknown");
    const [verified, verify] = useState(null)
    const [timeSinceRequest, setTimeSince] = useState(0)
    let cancelInterval
    useEffect(()=>{
        CheckVerification()
        
    }, [])
    useEffect(()=>{}, [timeSinceRequest])
    async function CheckVerification() {
        cancelInterval = setInterval(() => {setTimeSince(prevCount => prevCount + 1); console.log("Hello?")},1000)
        let req = await fetch("/api/login/verify", {method: "POST", 
        body: JSON.stringify({userID, token, 
            //serverOptions: {delay: 10500}
        }), headers: {'Content-Type': 'application/json'}})
        let res = await req.json()
        verify(!!res)
        setName(res)
        localStorage.setItem("Username",res)
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
                <h2><span class="border_underline">Welcome <span id="name">{name}</span></span></h2>
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