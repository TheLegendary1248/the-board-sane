//Controls routing for accessing boards
const router = require("express").Router()

//Make sure to authenticate usage

//Retrieve all boards a user has access to
router.get('/', (res,req) => {})

//Retrive a certain board
router.get('/:id', (res,req) => { })

//Add a board, primarily giving access to the user
router.post('/', (res,req) =>{})

module.exports = router