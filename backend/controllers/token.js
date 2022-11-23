//TODO DO COOKIE RESEARCH IN GENERAL
const db_token = require('../schema/token')
const db_verifyToken = require('../schema/verificationToken')
const db_user = require('../schema/user')
const bcrypt = require('bcrypt')
const salt = 9;
const { v4: uuidv4 } = require('uuid');

//NOTE OF CODE
//There are two kinds of tokens, Authentication tokens and Verification Tokens
//Authentication Tokens
// - Are used for keeping track of logged in users
// - Multiple can exist per user, but the token itself must be unique
// - For security, //TODO Delete all authentication tokens associated with a user after a number of failed login attempts (since a token could possibly persist after log out, or "Log out of all devices")
//Verification Tokens
// - Are used for verifying the user
// - Used for both verifying email when registering and when the user has forgotten their password since both conditions technically can't coexist
// - For the reason stated above, only one can exist per user. For security, any failure to match the token deletes it immediately
//TODO Flag users that have multiple failed login attempts via tokens

//Function that creates new authentication tokens
async function CreateAuthToken(res, doc_user) {
    let token = uuidv4();
    let hash = await bcrypt.hash(token, salt)
    //TODO Check for all authentication tokens. Allow a limit of 8 sign ins, or defined by the user
    //Create a new authentication token to expire in 30 days
    db_token.create({ token: hash, expires: new Date(Date.now() + 2_592_000_000), user: doc_user._id })
    //Set the session cookies
    res.cookie("Session", token)
    res.cookie("UserID", doc_user._id)
}
//TODO Add return for token expiration, aka log out user after set time
//Checks the authentication token that SHOULD be set as part of the cookies
async function CheckAuthToken(req) {
    //Check if the user exists
    if (req.cookies.UserID === undefined) { console.log("User ID cookie does not exist"); return null; }
    //Check for the token
    if (req.cookies.Session === undefined) { console.log("Session cookie does not exist"); return null; }
    //Check user document existence
    let userDoc = await db_user.findById(req.cookies.UserID).lean().exec()
    if (userDoc === null) return null;
    else {
        //Check token document existence
        let tokenDoc = await db_token.findOne({ token: await bcrypt.hash(req.cookies.Session) }).lean().exec()
        if (tokenDoc === null) return null;
        //Check token matches the user
        if (tokenDoc.user != userDoc._id) { console.log("User ID cookie does not match"); return null; }
        //Check token matches the session token
        else if (tokenDoc.token != req.cookies.Session) {
            //If the type is the forgot password token, delete on fail
            if (type === "forgot") { console.log("Forgot Password token deleted"); db_token.deleteOne({ token: req.cookies.Session }); }
            return null;
        }
    }
}

//Function for creating a "verification" token. Used in verification of email or when password is forgotten
async function CreateVerifyToken(doc_user) {
    let token = uuidv4();
    let hash = await bcrypt.hash(token, salt)
    console.log("Creating new verification token:", token);
    //Check for a previous token, probably from a resubmit
    let previousToken = await db_verifyToken.findOne({ user: doc_user._id }).exec()
    //If it doesn't exist, create a new one that expires in five minutes 
    if (!previousToken) {
        db_verifyToken.create({ token: hash, expires: new Date(Date.now() + 360_000), user: doc_user._id })
    }
    //Otherwise, overwrite it, with a new one that expires in five minutes
    else {
        console.log("Verification token already exists:", previousToken)
        previousToken.token = hash
        previousToken.expires = new Date(Date.now() + 360_000)
        previousToken.save()
    }
    //The token is not required to be unique so we can always return it without needing a check
    return token;
}
//Checks the verification token. The token gets deleted in the process if it exists, and the user is given an authentication token
async function CheckVerifyToken(req, res) {
    console.log("Verification: ( UserID:'", req.body.userID, "'; Token:'", req.body.token, "')")
    let doc_user = await db_user.findById(req.userID, "_id name").exec()
    //If document exists
    if (doc_user) 
    {   
        let doc_verifyToken = await db_verifyToken.findOne({user: doc_user._id}).exec()
        //If an associated verification token exists
        if(doc_verifyToken) {
            let isCorrect = await bcrypt.compare(req.body.token, doc_verifyToken.token)
            //If token matches
            if(isCorrect) {
                console.log("Verification: Succeeded")
                CreateAuthToken(res)
                res.send(doc_user.name)
                doc_user.verified = true
            }
            else {
                console.log("Verification: Token hash does not match")
                res.send("");
            }
            //Delete verification token regardless of outcome
            db_verifyToken.findByIdAndDelete(doc_verifyToken._id)
        }
        else { console.log("Verification: Token does not exist"); res.status(400).send("")}
    }
    else { console.log("Verification: Account does not exist"); res.status(404).send("")}
}
//FIXME I dont think this fully works
async function DeleteToken(res) {
    let cookie = res.cookie.Session
    res.clearCookie("Session")
    res.clearCookie("UserID")
    db_token.deleteOne({ token: cookie }).exec()
}
//
async function DeleteAllAssociatedTokens(res) {
    throw "Method not Implemented"
}


module.exports = { CreateNewToken: CreateAuthToken, CheckVerifyToken, CreateVerifyToken, CheckToken: CheckAuthToken, DeleteToken };