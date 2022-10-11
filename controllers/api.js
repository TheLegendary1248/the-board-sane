//This controller handles programmatic server-side calls
const router = require('express').Router()
const db = require('mongoose')
//Psuedo Code time


//...
router.get("/news")

//Checks if username is available
router.get("/checkUser", (req,res)=> {
    //Get from DB
    
    //Return True or False depending if found or not
    //USE LEAN
})

//Path for logging into the app
router.post("/login", (req,res) => {
    //Make sure that the user doesn't already have a session open
    //Find DB for match
    //Use a delay to slow down brute force attacks
    //Return true or false depending if found
    res.status(301).redirect("/board")
})

//Path for logging out
router.delete("/login", (req, res) =>
{
    //Check session cookie
    //Delete session cookie
    //Return to home page
})

//Path for registering a new user
router.post("/login/new", (req,res) => {
    //Double check with DB that user is available
    
    //Add user
    //
})

router.use("/userContent", require("./userContent"))

module.exports = router