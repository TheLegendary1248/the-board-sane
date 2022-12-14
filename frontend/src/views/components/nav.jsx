//This is the navbar for the website
import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import UserModal from './userModal'
import { userContext } from '../default'

//TODO Make a hamburger menu for mobile
function Nav() {
    let userContextValue = useContext(userContext)
    return (
            <nav>
                <div id="links">
                    <Link to={"/"}>Home</Link>
                    <Link to={"/about"}>About</Link>
                    {userContextValue ? <Link to={"/board"}>Board</Link> : <Link to={"/login"}>Login</Link>}
                </div>
                <UserModal/>
            </nav>
    )
}

export default Nav