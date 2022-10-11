const React = require("react")
const Default = require("./default.jsx")

function Error()
{
    return(
        <Default>
            <h2>Sorry, that page doesn't seem to exist</h2>
        </Default>
    )
}

module.exports = Error