//Controls routing for accessing boards
const router = require("express").Router()
const Board = require("../schema/board")
const TokenAuth = require("./token")

//Make sure to authenticate usage

//Retrieve all boards a user has access to
router.get('/', async (req, res) => {

    //Get user associated with token
    let token = await TokenAuth.CheckToken(req)
    //TODO Allow user to access their boards without login required
    if(token === null) res.status(301).redirect("/login") 
    else
    {
        let boards = await Board.find({user: token.user}).lean().exec()
        res.render("boardSelect", {boards: boards})
    } 
})

//Add a board, primarily giving access to the user
router.post('/', (req, res) =>
{}
)

//Retrieve a certain board
router.get('/:id', (req, res) => {
    res.render("board")
})

//TODO Mark board for deletion incase of accidents, instead of straight up deleting it
//Delete a board
router.delete('/:id', (req, res) => {
    //Ensure the user has permissions
    //Delete board information
    //Delete board itself
    //Return to board screen
    res.status(301).redirect("/board")
})

module.exports = router