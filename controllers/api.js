//This controller handles programmatic server-side calls
//FIXME Add error handling
const router = require('express').Router()
const User = require('../schema/user')
const Token = require('../schema/token')
const T_Functions = require("./token")
const cookierParser = require('cookie-parser')
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
    let dupe = await User.exists({name: body.name}).exec()
    body.creationDate = new Date();
    //If there is no duplication, create the new user
    //FIXME Create token here
    if(await dupe === null) 
    {
        User.create(body)
        res.status(301).redirect("/board")
    }
    //Otherwise, return the page
    //TODO Make page display special error here
    else res.status(301).redirect("/login?error=duplicate")
})

//Path for logging into the app
router.post("/login", async (req,res) =>  {
    //Check database
    let retrieved = await User.exists(req.body.cred).exec()
    //If null, return to login with failure message
    if(retrieved === null) {res.redirect("/login?error=incorrect"); return;}
    else
    {
        //Create token id, and id of user
        T_Functions.CreateNewToken(res)
        //TODO Use a delay to slow down brute force attacks
        res.status(301).redirect("/board")
    }
})

//Path for logging out
//FIXME This is incomplete
router.delete("/login", async (req, res) =>
{
    //Check session cookie
    let check = await T_Functions.CheckToken(req)
    if(check === false) {

    }
})



router.use("/userContent", require("./userContent"))

module.exports = router