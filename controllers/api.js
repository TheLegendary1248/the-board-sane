//This controller handles programmatic server-side calls
//FIXME Add error handling
const router = require('express').Router()
const User = require('../schema/user')
const Token = require('../schema/token')
const TokenAuth = require("./token")
const { CheckToken } = require('./token')

//...
router.get("/news", (req,res) => {
    res.status(301).redirect("/error")
})

//Checks if username is available
router.get("/checkUser/:name", async (req,res)=> {
    //Get from DB
    let dupe = await User.exists({name: req.params.name}).lean().exec()
    //Return True or False depending if found or not
    res.send(dupe !== null)
})

//Path for registering a new user
//TODO Add email validation 
router.post("/login/new", async (req,res) => {
    //Double check with DB that user is available
    let body = req.body
    let dupe = await User.exists({name: body.name}).lean().exec()
    body.creationDate = new Date();
    //If there is no duplication, create the new user
    //FIXME Create token here
    if(await dupe === null) 
    {
        User.create(body)
        res.send(true)
    }
    //Otherwise, return the page
    else res.send(false)
})

//Path for logging into the app
//TODO Prevent reloading page on incorrect credentials
//TODO Cache username as cookie to showup on login status
router.post("/login", async (req,res) =>  {
    //Check database
    console.log("Logged in")
    let body = req.body
    console.log(body)
    if(body.name === undefined || body.pass === undefined){
        console.log("Request body does not contain all fields required")
        res.send(false)
        return;
    }
    let retrieved = await User.exists(body).lean().exec()
    console.log(retrieved)
    //If null, return false
    if(retrieved === null) {console.log("What?");res.send(false); }
    else
    {
        console.log("HEH?")
        //Create token id, and id of user
        TokenAuth.CreateNewToken(res, retrieved)
        //TODO Use a delay to slow down brute force attacks
        res.send(true)
    }
})

//Path for logging out
//FIXME This is incomplete
router.delete("/login", async (req, res) =>
{
    //Check session cookie
    let check = await TokenAuth.CheckToken(req)
    if(check === false) {

    }
})



router.use("/userContent", require("./userContent"))

module.exports = router