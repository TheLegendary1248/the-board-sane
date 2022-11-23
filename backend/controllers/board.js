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
        //Virtual Testing. Not working yet
        //let t = (await token.populate('user')).user
        //let b = await t.populate('Board')
        //console.log(b)
        let boards = await Board.find({user: token.user}).lean().exec()
        res.send(boards)
    } 
})

//Add a board, primarily giving access to the user
router.post('/', async (req, res) =>{
    console.log("hello!", req.body)
    //If the content type header is plain text, accept it as the creation of a single new board
    //Using the text as the board name, assuming it's within limits
    if(req.headers["content-type"] === "text/plain") 
    {
        console.log("Hello world")
        TokenAuth.CheckToken(req)
        res.send(true)
        res.end()
    }
    //Else, assuming it's a normal json, pretend it's a pre-existing offline board with items. Implement later
    else if (false) {}
    else {
        res.status(400).end()
    }
    return;
    
    //Create a new board under the user's account
    let board = await Board.create({})
}
)

//Retrieve a certain board
router.get('/:id', (req, res) => {
    res.render("board")
})

//Post an item
router.post('/:id/item', (req, res) => {
    res.status(404).end()
})

//Patch an item
router.patch('/:id/item', (req, res) => {
    res.status(404).end()
})

//Delete an item
router.delete('/:id/item/:itemid', (req, res) => {
    res.status(404).end()
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