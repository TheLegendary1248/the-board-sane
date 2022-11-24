const bcrypt = require('bcrypt')
const db_user = require('../schema/user')
const router = require('express').Router()
const { CreateNewToken, DeleteToken, CheckToken, CheckVerifyToken, CreateVerifyToken} = require("./token")
const { SendMail } = require('../utils/emailHandler.js')
const { GetHtmlFile } = require('../utils/htmlReader.js')
const path = require('path');
const user = require('../schema/user')
const salt = 12

//Path for creating a new user. Returns true if the request succeeds, false otherwise
router.post("/new", async (req, res) => {
    try {
        let body = req.body
        //General function for sending the verification email(and setting the document password hash)
        async function SendVerification(doc_user) {
            //NOTE: I am intentially using the document's fields over the request body to avoid misalignment of request and document values. Don't like it? Too bad, it ensures equality
            //Hash password and save to user
            let hash = await bcrypt.hash(body.pass, salt)
            doc_user.pass = hash;
            doc_user.save();
            //Setup email and verification token
            let emailHTML = await GetHtmlFile(path.join(__dirname, "../emailPresets/verify.html"))
            emailHTML.inserts.name = doc_user.name
            console.log("Name:", doc_user.name)
            let token = await CreateVerifyToken(doc_user)
            emailHTML.inserts.url = process.env.SITE_URL + `/verify/${doc_user._id}/${token}`
            SendMail(doc_user.email, "The Board - Verify your email", emailHTML.Join());
            res.send(true)
        }    
        //Ensure the body has the requested fields, send 400 if not
        if(!('pass' in body && 'email' in body && 'name' in body)) {
            res.status(400).send(false)
            return;
        }
        //Fake response option
        if(body.useFakeResponse)
            return res.send(body.fakeResponse ? true : false)
        //Get any duplicates
        let doc_userDupe = await db_user.findOne({ name: body.name }, 'name email verified _id').exec()
        let doc_emailDupe = await db_user.findOne({ email: body.email }, 'verified _id').exec()
        body.creationDate = new Date();
        //If they happen to be the same, repeat the request if not verified, whilst using the new body password (as if the request was somehow repeated)
        console.log("Document null check:", (doc_userDupe && doc_emailDupe))
        console.log("Id match check:", doc_userDupe?.equals(doc_emailDupe))
        console.log("Email:", doc_emailDupe, "User:", doc_userDupe)
        if ((doc_userDupe && doc_emailDupe) && doc_userDupe.equals(doc_emailDupe)) {
            console.log("Register attempt with prexisting user")
            if (doc_userDupe.verified) res.status(409).send(false)
            else {
                console.log("Pre-existing user is unverified, repeating verification")
                SendVerification(doc_userDupe)
            }
        }
        //If there are no verified duplicates of either name or email, create the new user
        else if (!doc_userDupe?.verified && !doc_emailDupe?.verified) {
            console.log("Registering a new user")
            //Remove the unverified email duplicate
            if(doc_emailDupe) { 
                db_user.findByIdAndDelete(doc_emailDupe._id).exec()
                console.log("Email duplicate deleted")
            }
            //Use user duplicate if existent
            let doc_user = doc_userDupe ?? new db_user({creationDate: new Date(), name: body.name})
            doc_user.email = body.email
            console.log("User document:", doc_user)
            SendVerification(doc_user)
        }
        //Otherwise, send false
        else res.send(false)
    } catch (error) {
        console.log("Error met during register or sending verification:", error)
        res.status(500).end();
    }
})
//TODO Prevent reloading page on incorrect credentials
//TODO Cache username as cookie to showup on login status
//Path for LOGGING IN
router.post("/", async (req, res) => {
    //Check that request can be processed
    let body = req.body
    console.log("Attempt to log in with creds ( Login:'", req.body.name, "'; Pass:'", req.body.pass, "')")
    if (body.name === undefined || body.pass === undefined) {
        res.status(400).send("Request does not contain the fields required")
        return;
    }
    //Fake response option
    if(body.useFakeResponse) 
        if(body.fakeResponse) {
            CreateNewToken(res)
        }
        else {

        }
    let userDoc_lean = await db_user.findOne(body).lean().exec()
    //If document does not exist, fail
    if (userDoc_lean === null) { console.log("Account does not exist"); res.status(404).send(false); }
    //Else create a new token and send back true
    else {
        //Create token id, and id of user
        CreateNewToken(res, userDoc_lean)
        //TODO Use a delay to slow down brute force attacks
        res.send(true)
    }
})

//Path for LOGGING IN BY EMAIL LINK. Multipurpose, email verification and password forgotten (but the user doesn't need to know that)
router.post("/verify", async (req, res) => {
    let body = req.body
    res.set('Content-Type','text/plain')
    if(body.useFakeResponse) 
            return res.send(body.fakeResponse ? "John Doe" : "")
    if (body.userID === undefined || body.token === undefined) {
        console.log("/verify : Bad request. Body:", req.body)    
        res.status(400).end()
    }
    else CheckVerifyToken(req, res)
})
//FIXME This is incomplete
//Path for LOGGING OUT
router.delete("/", async (req, res) => {
    //Check session cookie
    let check = await CheckToken(req)
    if (check === false) {

    }
})

module.exports = router