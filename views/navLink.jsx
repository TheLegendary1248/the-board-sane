//This will function as a link for navbar
const React = require('react')

function NavLink(link){
    return(
    <span>
        <a href={link.link.link}>{link.link.text}</a>
    </span>
    )
}

module.exports = NavLink