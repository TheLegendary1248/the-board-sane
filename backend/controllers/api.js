//This controller handles programmatic server-side calls
//FIXME Add error handling
const router = require('express').Router()
const User = require('../schema/user')
const Token = require('../schema/token')
const { CheckToken } = require('./token')

//News about the webpage
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
//Checks if username is available
router.get("/checkEmail/email", async (req,res)=> {
    //Get from DB
    let dupe = await User.exists({email: req.params.email}).lean().exec()
    //Return True or False depending if found or not
    res.send(dupe !== null)
})
//Login path
router.use('/login', require('./login'))

module.exports = router