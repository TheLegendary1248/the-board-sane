//This is the navbar for the website
const React = require('react')
const NavLink = require('./navLink.jsx')

function Nav(){
    return(
    <nav>
        <NavLink link={{text:'Home', link:'/'}}></NavLink>
        <NavLink link={{text:'About', link:'/about'}}></NavLink>
        <NavLink link={{text:'Login', link:'/login'}}></NavLink>
    </nav>
    )
}

module.exports = Nav