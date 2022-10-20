//This is the navbar for the website
import React from 'react'
import NavLink from './navLink.jsx'

//TODO Make a hamburger menu for mobile

let unusedModal = (
<div id="userModal">
    <span>Welcome unknown</span>
</div>)

function Nav(){
    return(
    <nav>
        <img src="this_came_out_better_than_expected.png"/>
        <NavLink link={{text:'Home', link:'/'}}></NavLink>
        <NavLink link={{text:'About', link:'/about'}}></NavLink>
        <NavLink link={{text:'Login', link:'/login'}}></NavLink>
        <NavLink link={{text: 'MyBoards', link: '/board'}}></NavLink>
    </nav>
    )
}

export default Nav