//This will function as a link for navbar
const React = require('react')

function NavLink(link){
    return(
    <div>
        <a href={link.link.link}>{link.link.text}</a>
    </div>
    )
}

module.exports = NavLink