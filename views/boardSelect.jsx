//The main purpose of the application
const React = require("React")
const Default = require("./default.jsx")


//TODO Allow this page to be accessed without signing up. Use cookies to save board info for unregistered users
function BoardSelect()
{
    return(
        <Default title="Your Boards">
            <p>You currently have no boards</p>
        </Default>
    )
}

module.exports = BoardSelect