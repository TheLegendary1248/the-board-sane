//This is the navbar for the website
const React = require('react')
const NavLink = require('./navLink.jsx')

//TODO Make a hamburger menu for mobile
function Nav(){
    return(
    <nav>
        <img src="this_came_out_better_than_expected.png"/>
        <NavLink link={{text:'Home', link:'/'}}></NavLink>
        <NavLink link={{text:'About', link:'/about'}}></NavLink>
        <NavLink link={{text:'Login', link:'/login'}}></NavLink>
        <div id="userModal" style={{float: "right"}}>
            <span>Welcome unknown</span>
        </div>
    </nav>
    )
}

module.exports = Nav