//Router for manipulating the user's account
const router = require('express').Router()
const DB_user = require('../schema/user')
const {CreateNewToken} = require('./token')

//Forgot endpoint
router.get("/forgot/:type/:value", async (req, res)=> {
    //Check the type
    if(req.params.type === "email" | req.params.type === "name") {
        //Find the doc
        console.log("Type:", req.params.type,"; Value:", req.params.value)
        console.log("Object:", {[req.params.type]: req.params.value})
        DB_user.findOne()
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
            let token = await CreateNewToken( res, doc, "forgot")
            //Send the token hex-fied because the URL comes out wierd otherwise
            let url = `http://localhost:1248/forgot/${hexToken}`
            emailHTML.inserts.url = url
            //SendMail(doc.email, "Forgot your password?", emailHTML.Join())
        }
    }
    //Bad request
    else res.status(400).end()
})

module.exports = router