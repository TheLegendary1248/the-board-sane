//The page to test all the frontend stuff, and probably screw around with ideas
const React = require("react")
const Default = require("./default.jsx")

function Test()
{
    return(
        <Default title="Page Title">
            <h3>Welcome to the testing page</h3>
        </Default>
    )
}

module.exports = Test