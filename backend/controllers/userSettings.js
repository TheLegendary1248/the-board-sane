//Router for manipulating the user's account
const router = require('express').Router()
const db_user = require('../schema/user')
const { CreateVerifyToken, CheckAuthToken } = require('../utils/token')
const {SendMail} = require('../utils/emailHandler')
const {GetHtmlFile} = require('../utils/htmlReader')
const path = require('path')
const bcrypt = require('bcrypt')
const salt = 12
//Forgot endpoint
router.post("/forgot/:type/:value", async (req, res)=> {
    //Check the type
    if(req.params.type === "email" | req.params.type === "name") {
        //Find the doc
        let doc_user = await db_user.findOne({[req.params.type]: req.params.value}).lean().exec()
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

router.patch("/changepass", async (req, res) => {
    let newpass = req.body.newpass
    let oldpass = req.body.oldpass
    //res.setHeader('Content-Type', 'text/plain')
    if(!typeof(oldpass) === "string" || !typeof(newpass) === "string") 
    {   //Request is not valid
        console.warn(__dirname, "Change password: Request not valid".red)
        res.status(400).send("Request is not valid"); return}
    //Get user
    let doc_user = await CheckAuthToken(req)
    if(!doc_user)
    {   //User is not signed in
        console.log(__dirname, "User is not signed in".yellow)
        res.status(403).send("Not signed in"); return; }
    if(!await bcrypt.compare(oldpass, doc_user.pass))
    {   //If given old password does not match
        console.log(__dirname, "Old password does not match".yellow)
        res.status(403).send("Old password does not match"); return}
    else 
    {   //Change password
        doc_user.pass = await bcrypt.hash(newpass, salt); 
        res.status(200).end()}
    
    
})
//Delete all content marked for deletion by user
router.delete("/force", async (req, res) => {
    //Check auth and password resubmit
    //Get user data
    //Iterate over all and remove 'marked for deletion' data
    //
})
//Simply patch the user's cloud set settings
router.patch("/settings", async (req, res) => {
    //Get user
    //Get user associated settings doc
    //Save
})
module.exports = router