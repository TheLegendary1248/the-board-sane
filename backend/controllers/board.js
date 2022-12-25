//Controls routing for accessing boards
const router = require("express").Router()
const { db } = require("../schema/board")
const db_board = require("../schema/board")
const {CheckAuthToken, CheckAuthTokenCatchInvalid} = require("../utils/token")

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
    //TODO Delete any boards marked to be deleted
    //Authenticate
    let doc_user = await CheckAuthTokenCatchInvalid(req)
    console.log("User document:", doc_user)
    if(!doc_user) return;
    //If the content type header is plain text, accept it as the creation of a single new board
    //Using the text as the board name, assuming it's within limits
    else if(req.headers["content-type"] === "text/plain") 
    {
        if(req.body === "") {console.warn("Request body is empty".red); res.status(400).end(); return;}
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
//TODO ENSURE AUTH CHECK ON ALLA THESEEEEEEEEE
//Get paths to all of a boards items
router.get('/:id', async (req, res) => {
    //Retrieve board doc
    let doc_board = await db_board.findById(req.params.id)
    //Send array of board items
    res.send(doc_board.items)
})

//TODO Mark board for deletion incase of accidents, instead of straight up deleting it
//Delete a board
router.delete('/:id', async (req, res) => {
    let doc_board = await db_board.findById(req.params.id)
    //Ensure the user has permissions
    doc_board.markForDeletion = false
    doc_board.save()
    //Return to board screen
    res.status(301).redirect("/board")
})

const items = require('../schema/item')
//===ITEMS===
//Get item at path
router.get('/item/:item/:id', async (req, res) => {
    //TODO Respect If-Modified-Since
    let doc_item = await items["note"].findById(req.params.item)
    
    //Return item at path
})

//Post an item
router.post('/item/:item', async (req, res) => {
    let item = await new items["note"]()
    
    //Make sure the given item works
    item.validate()

    res.send(item.id)
    //Check user-limit
    //START TRANSACTION
    //Add item referenced collection
    //Get board, add item ref to board array of items
    //Return success condition
    res.status(404).end()
})

//Patch an item at path
router.patch('/item/:item/:id', async (req, res) => {
    let doc_item = await items["note"].findById(req.params.item)
    //Uhhh, yes i would know what to do here
    //Iterate over given object and update each field...
    //this is already a utility function somewhere, i know it is...
    doc_item.validate() //just make sure
    //Patch item at path
    res.status(404).end()
})

//Mark an item for deletion
router.delete('/item/:item/:id', async (req, res) => {
    let doc_item = await items["note"].findById(req.params.item)
    //Mark for deletion
    res.status(404).end()
})

/*TODO Make all data marked for deletion get deleted under the conditions...
    - the user's limit is reached
    - it's been 7 days since marking
        ^ unless set by user
            ^ Avoid malicous deletion through reconfiguring this default by keeping a 
            timestamp of the furthest time that said data would've been deleted before said change
    - User manually force deletes said data and confirms with password
*/
module.exports = router