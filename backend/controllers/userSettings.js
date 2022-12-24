//Router for manipulating the user's account
const router = require('express').Router()
const DB_user = require('../schema/user')
const { CreateVerifyToken } = require('../utils/token')
const {SendMail} = require('../utils/emailHandler')
const {GetHtmlFile} = require('../utils/htmlReader')
const path = require('path')
//Forgot endpoint
router.post("/forgot/:type/:value", async (req, res)=> {
    //Check the type
    if(req.params.type === "email" | req.params.type === "name") {
        //Find the doc
        let doc = await DB_user.findOne({[req.params.type]: req.params.value}).lean().exec()
        console.log("Retrieved doc:", await doc)
        //If not found, fail
        if(doc === null) {
            res.status(404).send(false)
        }
        //If found, send the email
        else {
            res.send(true)
            let emailHTML = await GetHtmlFile(path.join(__dirname,"../emailPresets/forgotCreds.html"))
            let token = await CreateVerifyToken(doc)
            //Send the token hex-fied because the URL comes out weird otherwise
            let url =  process.env.SITE_URL = `/forgot/${token}`
            emailHTML.inserts.url = url
            SendMail(doc.email, "Forgot your password?", emailHTML.Join())
        }
    }
    //Bad request
    else res.status(400).end()
})

module.exports = router