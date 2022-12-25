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
        let doc_user = await DB_user.findOne({[req.params.type]: req.params.value}).lean().exec()
        console.log("Retrieved doc:", await doc_user)
        //If not found, fail
        if(doc_user === null) {
            res.status(404).send("Name or email was not found")
        }
        //If found, send the email
        else {
            //TODO Make response reflect success rather than predetermining it
            res.send(true)
            let emailHTML = await GetHtmlFile(path.join(__dirname,"../emailPresets/forgotCreds.html"))
            let token = await CreateVerifyToken(doc_user)
            //Send the token hex-fied because the URL comes out weird otherwise
            let url = process.env.SITE_URL + `/changeLogin/${doc_user._id}/${token}`
            emailHTML.inserts.url = url
            SendMail(doc_user.email, "Forgot your password?", emailHTML.Join())
        }
    }
    //Bad request
    else res.status(400).send("First parameter is not a valid type")
})

//Simply patch the user's cloud set settings
router.patch("/settings", async (req, res) => {
    //Get user
    //Get user associated settings doc
    //Save
})
module.exports = router