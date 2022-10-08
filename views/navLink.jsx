const React = require('react')

//This will function as a link for navbar
function NavLink(link){
    return(
    <div>
        <a href={link.link.link}>{link.link.text}</a>
    </div>
    )
}

module.exports = NavLink