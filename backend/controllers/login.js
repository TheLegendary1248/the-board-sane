const bcrypt = require('bcrypt')
const userDB = require('../schema/user')
const router = require('express').Router()
const {CreateNewToken, DeleteToken, CheckToken} = require("./token")
const {SendMail} = require('../utils/emailHandler.js')
const {GetHtmlFile}= require('../utils/htmlReader.js')
const path = require('path');
const salt = 12

//Path for creating a new user
//TODO Add email validation
router.post("/new", async (req, res) => {
    //Double check with DB that user is available
    let body = req.body
    let dupe = await userDB.exists({ name: body.name }).lean().exec()
    body.creationDate = new Date();
    //If there is no duplication, create the new user
    //FIXME Create token here
    if (await dupe === null) {
        let hash = await bcrypt.hash(body.pass, salt)
        body.pass = hash;
        let emailHTML = await GetHtmlFile(path.join(__dirname,"../emailPresets/verify.html"))
        emailHTML.inserts.name = body.name
        //TODO Set to correct url
        emailHTML.inserts.url = "https://localhost:1248/api/verify"
        userDB.create(body);
        await SendMail(body.email, "The Board - Verify your email", emailHTML.Join());
        res.send(true)
    }
    //Otherwise, return the page
    else res.send(false)
})
router.get('/verify', async(req, res) => {
    res.status(302).redirect("/board")
})
//TODO Prevent reloading page on incorrect credentials
//TODO Cache username as cookie to showup on login status
router.post("/", async (req, res) => {
    //Check database
    console.log("Logged in")
    let body = req.body
    console.log(body)
    if (body.name === undefined || body.pass === undefined) {
        console.log("Request body does not contain all fields required")
        res.send(false)
        return;
    }
    let retrieved = await userDB.exists(body).lean().exec()
    console.log(retrieved)
    //If null, return false
    if (retrieved === null) { console.log("What?"); res.send(false); }
    else {
        //Create token id, and id of user
        CreateNewToken(res, retrieved)
        //TODO Use a delay to slow down brute force attacks
        res.send(true)
    }


})
//Path for logging out
//FIXME This is incomplete
router.delete("/", async (req, res) => {
    //Check session cookie
    let check = await CheckToken(req)
    if (check === false) {

    }
})

async function sendVerifyEmail(){

}
module.exports = router