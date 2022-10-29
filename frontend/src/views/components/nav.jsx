//This is the navbar for the website
import React from 'react'
import { Link } from 'react-router-dom'
import UserModal from './userModal'

//TODO Make a hamburger menu for mobile
function Nav(){
    return(
    <nav>
        <img src="this_came_out_better_than_expected.png"/>
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/board"}>Board</Link>
        <UserModal/>
    </nav>
    )
}

export default Nav