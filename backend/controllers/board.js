//Controls routing for accessing boards
const router = require("express").Router()
const db_board = require("../schema/board")
const {CheckAuthToken, CheckAuthTokenCatchInvalid} = require("./token")

//TODO Make sure to authenticate usage
//Retrieve all boards a user has access to
router.get('/', async (req, res) => {
    //Get user associated with token
    let doc_user = await CheckAuthToken(req)
    //TODO Allow user to access their boards without login required
    if(doc_user === null) res.status(401).end() 
    else
    {
        //Virtual Testing. Not working yet
        //let t = (await token.populate('user')).user
        //let b = await t.populate('Board')
        //console.log(b)
        let boards = await db_board.find({user: doc_user._id}).lean().exec()
        res.send(boards)
    } 
})

//Add a board, primarily giving access to the user
router.post('/', async (req, res) =>{
    //Authenticate
    let doc_user = await CheckAuthTokenCatchInvalid(req)
    console.log("User document:", doc_user)
    if(!doc_user) return;
    //If the content type header is plain text, accept it as the creation of a single new board
    //Using the text as the board name, assuming it's within limits
    else if(req.headers["content-type"] === "text/plain") 
    {
        console.log("Creating board with just name")
        let board = await db_board.create({user: doc_user._id, name:req.body})
        res.setHeader('Content-Type','text/plain')
        res.status(200).send(board.id)
        return;
    }
    //Else, assuming it's a normal json, pretend it's a pre-existing offline board with items. Implement later
    else if (false) {}
    else 
    {   //Bad request 
        res.status(400).end()
    }
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