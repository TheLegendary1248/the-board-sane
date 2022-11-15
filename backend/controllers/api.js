//This controller handles programmatic server-side calls
//FIXME Add error handling
const router = require('express').Router()
const User = require('../schema/user')
const Token = require('../schema/token')
const { CreateNewToken, CheckToken } = require('./token')
const { SendMail } = require('../utils/emailHandler')

//News about the webpage
router.get("/news", (req,res) => {
    res.status(301).redirect("/error")
})

//Checks if username is available
router.get("/checkUser/:name", async (req,res)=> {
    let dupe = await User.exists({name: req.params.name}).lean().exec()
    res.send(dupe !== null)
})
//Checks if username is available
router.get("/checkEmail/:email", async (req,res)=> {
    let dupe = await User.exists({email: req.params.email}).lean().exec() 
    res.send(dupe !== null)
})
router.get("/forgot/:type/:value", async (req, res)=> {
    //If email is used
    if(req.params.type === "email" | req.params.type === "user") {
        let doc = await User.findOne({[req.params.type]: req.params.value}).lean().exec()
        if(doc === null) {
            res.send(false)
        }
        else {
            CreateNewToken( res, doc, "forgot")
        }
    }
    //Bad request
    else 
    {
        res.status(400).end()
    }
    return;
    CreateNewToken(res, null,"forgot")
})
//Login path
router.use('/login', require('./login'))

//Board path
router.use('/board', require('./board'))

module.exports = router