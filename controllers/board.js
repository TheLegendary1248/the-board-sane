//Controls routing for accessing boards
const router = require("express").Router()
const db = require("mongoose")

//Make sure to authenticate usage

//Retrieve all boards a user has access to
router.get('/', (req, res) => {})

//Add a board, primarily giving access to the user
router.post('/', (req, res) =>{})

//Retrieve a certain board
router.get('/:id', (req, res) => {

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