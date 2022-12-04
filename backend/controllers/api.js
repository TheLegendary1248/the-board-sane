//This controller handles programmatic server-side calls
//FIXME Add error handling
const router = require('express').Router()
const DB_user = require('../schema/user')
const DB_token = require('../schema/authenticationToken')
const { CreateNewToken, CheckToken } = require('./token')
const { SendMail } = require('../utils/emailHandler')
const { GetHtmlFile } = require('../utils/htmlReader')
const path = require('path')

//TODO Log only when the user has a 'verbose' cookie set

//News about the webpage
router.get("/news", (req,res) => {
    res.status(301).redirect("/error")
})

//Checks if username is available
router.get("/checkUser/:name", async (req,res)=> {
    let dupe = await DB_user.exists({name: req.params.name, verified: true}).lean().exec()
    res.send(dupe !== null)
})
//Checks if username is available
router.get("/checkEmail/:email", async (req,res)=> {
    let dupe = await DB_user.exists({email: req.params.email, verified:true}).lean().exec() 
    res.send(dupe !== null)
})

//Login path
router.use('/login', require('./login'))

//Board path
router.use('/board', require('./board'))

//User Settings
router.use('/user', require('./userSettings'))

module.exports = router