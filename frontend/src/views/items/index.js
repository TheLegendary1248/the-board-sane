//Refers to all items
let itemTable = {
    note : {
        desc: "A standard note",
        import: () => import('./note')
    },
    page : {
        desc: "Just like a note, but with a title",
        import: () => import('./page')
    },
    clock : {
        desc: "A thing that measures time",
        import: () => import('./clock')
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

export default itemTable