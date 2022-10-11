//Manipulates the users stuff
const router = require('express').Router()

//Moar Psuedo code

var path;
var db;

//Rather dumb having forgot the object is right there ^
//Get all of the user's content
router.get("/",(res,req) =>{
    
    db.Content.get({with: req.body.userHash})
})
//Add user content
router.post("")

//Update user content
router.put("")

module.exports = router
