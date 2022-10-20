//This will function as a link for navbar
import React from 'react';

function NavLink(link){
    return(
    <span>
        <a href={link.link.link}>{link.link.text}</a>
    </span>
    )
}

export default NavLink