//This is the navbar for the website
const React = require('react')
const NavLink = require('./navLink.jsx')

function Nav(){
    return(
    <nav>
        <img src="this_came_out_better_than_expected.png" style={{width: "100px", height: "100px"}}/>
        <NavLink link={{text:'Home', link:'/'}}></NavLink>
        <NavLink link={{text:'About', link:'/about'}}></NavLink>
        <NavLink link={{text:'Login', link:'/login'}}></NavLink>
    </nav>
    )
}

module.exports = Nav