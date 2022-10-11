//This controller handles programmatic server-side calls
const router = require('express').Router()
const User = require('../schema/user')
const Token = require('../schema/token')
const T_Functions = require("./token")
const cookierParser = require('cookie-parser')
const {v4: uuidv4 } = require('uuid')

//...
router.get("/news")

//Checks if username is available
router.get("/checkUser/:name", (req,res)=> {
    //Get from DB
    
    //Return True or False depending if found or not
    //USE LEAN
})

//Path for registering a new user
router.post("/login/new", (req,res) => {
    //Double check with DB that user is available
    //Add user
    User.create({name: "Hello", pass: "1248", creationDate: new Date()})
    
    
    

    res.cookie("Session", "Hi, im a cookie")
    res.send("Hi")
    console.log("Hoi")
})

//Path for logging into the app
router.post("/login", async (req,res) =>  {
    //Check database
    let retrieved = await User.exists(req.body.cred).exec()
    //If null, return to login with failure message
    if(retrieved === null) {res.redirect("/login?error=incorrect"); return;}
    //Create token id, and id of user
    T_Functions.CreateNewToken(res)
    //TODO Use a delay to slow down brute force attacks
    res.status(301).redirect("/board")
})

//Path for logging out
router.delete("/login", (req, res) =>
{
    //Check session cookie
    //Delete session cookie
    //Return to home page
})



router.use("/userContent", require("./userContent"))

module.exports = router