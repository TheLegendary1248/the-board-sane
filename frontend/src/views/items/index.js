import React from 'react'

//Refers to all items
let itemTable = {
    note : {
        desc: "A standard note"
    },
    page : {
        desc: "Just like a note, but with a title"
    },
    clock : {
        desc: "A thing that measures time"
    },
    grid: {
        desc: "This differs from a table in some way"
    },
    table: {
        desc: "This differs from a grid in some way"
    },
    calendar: {
        desc: "Something with keeping track of time"
    },
    path: {
        desc: "Connects two items"
    },
    swatch: {
        desc: "Color me confused"
    },
    webclip: {
        desc: "This sounds like too much work to make happen"
    },
    game: {
        desc: "Let's relax a little"
    },
    kickstart: {
        desc: "A push in the right direction. Not a reference to Kickstarter"
    },
    link: {
        desc: "Is this the equivalent of a webclipper?"
    },
    todo: {
        desc: "Everybody has something to do"
    }
}

//Automate adding imports
Object.entries(itemTable)
    .forEach(
        (item, _, __) => itemTable[item[0]].import 
            = () => React.lazy(() => import('./' + item[0])))

export default itemTable