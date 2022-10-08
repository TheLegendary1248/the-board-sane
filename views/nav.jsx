const { text } = require('express')
const React = require('react')
const NavLink = require('./navLink.jsx')
//This is the navbar for the website
function Nav(){
    return(
    <nav>
        <NavLink link={{text:"Home",link:""}}></NavLink>
        <NavLink param={{text:"About",link:""}}></NavLink>
        <NavLink anything={{text:"Other link",link:""}}></NavLink>
    </nav>
    )
}

module.exports = Nav