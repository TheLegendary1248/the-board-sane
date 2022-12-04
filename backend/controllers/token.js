//TODO DO COOKIE RESEARCH IN GENERAL
const db_authToken = require('../schema/authenticationToken')
const db_verifyToken = require('../schema/verificationToken')
const db_user = require('../schema/user')
const bcrypt = require('bcrypt')
const salt = 9;
const uuid = require('uuid');
const { Mongoose, default: mongoose } = require('mongoose');
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

/**
 * Creates an Authentication token
 * @param {Express.Response} res The response object to the request. Used in setting cookies Session and UserID, therefore headers must not be sent prior
 * @param {mongoose.Document} doc_user The User's Document's ID
 * @returns {Promise<Boolean>} Returns true if successful in creating the token
 */
async function CreateAuthToken(res, doc_user) {
    if(res.headersSent)
    {   //If headers are already sent, return false and log it
        console.error(__filename, "CreateAuthToken: Cannot send cookies because headers were already sent".yellow)
        return false;
    }
    try {
        if(res.useFakeResponse) 
        {   //Set placeholder cookies if response expected to be faked
            res.cookie("UserID", "1248")
            res.cookie("Session", "NULL")
            return true
        }
        else 
        {   //Create token and hash it
            let token = uuid.v4();
            let hash = await bcrypt.hash(token, salt);
            //TODO Check for all authentication tokens. Allow a limit of 8 sign ins, or defined by the user
            //Create a new authentication token to expire in 30 days
            let doc_authToken = new db_authToken({ token: hash, expires: new Date(Date.now() + 2_592_000_000), user: doc_user })
            //Set cookies
            res.cookie("Session", token)
            res.cookie("UserID", doc_user.id)
            doc_authToken.save()
            return true;
        }
    }
    catch(error)
    {
        console.error("CreateAuthToken: Error caught while creating Authentication Token : ".red, error)
        return false;
    }
}

/** Checks the authentication token sent as 'UserID' and 'Session' cookies
 * @param {Express.Request} req The request object
 * @returns {Boolean} Whether the authentication token could be successfully created and set as cookies
 */
//TODO Add return for token expiration, aka log out user after set time
//Checks the authentication token that SHOULD be set as part of the cookies
async function CheckAuthToken(req) {
    let userID = req.cookies.UserID
    let session = req.cookies.Session
    if(req.useFakeResponse)
    {
        if(req.fakeResponse)
        {

        }
        else{

        }
    }
    //Check if the user id cookies exists
    if (!mongoose.isValidObjectId(userID)) { console.warn(__filename, `: CheckAuthToken: UserID cookie(${userID}) is not valid`.yellow); return null; }
    //Check if the session cookie exists
    if (!uuid.validate(session)) { console.warn(__filename, `: CheckAuthToken: Session cookie(${session}) is not valid`.yellow); return null; }
    console.log(`Checking Auth Token ( UserID: ${userID}, Session: ${session})`)
    //Check user document existence
    let doc_token = await db_user.findById(req.cookies.UserID).lean().exec()
    if (doc_token === null) { console.warn(__filename, ": CheckAuthToken: Token does not exist".yellow); return null; }
    else {
        //Check token document existence
        let doc_token = await db_authToken.findOne({ token: await bcrypt.hash(session, salt) }).lean().exec()
        if (doc_token === null) return null;
        //Check token matches the user
        if (doc_token.user != doc_token._id) { console.log("User ID cookie does not match"); return null; }
        //Check token matches the session token
        else if (doc_token.token != session) {
            //If the type is the forgot password token, delete on fail
            if (type === "forgot") { console.log("Forgot Password token deleted"); db_authToken.deleteOne({ token: session }).exec(); }
            return null;
        }
    }
}

//Function for creating a "verification" token. Used in verification of email or when password is forgotten
async function CreateVerifyToken(doc_user) {
    let token = uuid.v4();
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
/**
 * Checks the verification token. The token gets deleted in the process if it exists, and the user is given an authentication token. \n
 * NOTE that this function already sends a response
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function CheckVerifyToken(req, res) {
    console.log("Verification: ( UserID:'", req.body.userID, "'; Token:'", req.body.token, "')")
    let doc_user = await db_user.findById(req.body.userID, "_id name").exec()
    console.log(doc_user)
    //If document exists
    if (doc_user) 
    {   
        let doc_verifyToken = await db_verifyToken.findOne({user: doc_user._id}).exec()
        //If an associated verification token exists
        if(doc_verifyToken) {
            console.log("Body token:", req.body.token, "Verify token:", doc_verifyToken.token)
            let isCorrect = await bcrypt.compare(req.body.token, doc_verifyToken.token)
            //If token matches
            if(isCorrect) {
                //If token is still valid
                if((Date.now() - doc_verifyToken.expires.getTime()) < 0)
                {
                    console.log("Verification: Succeeded")
                    await CreateAuthToken(res, doc_user)
                    res.send(doc_user.name)
                    doc_user.verified = true
                    doc_user.save()
                }
                else{
                    console.log("Verification: Token has expired")
                    res.send("")
                }
            }
            else {
                console.log("Verification: Token hash does not match")
                res.send("");
            }
            //Delete verification token regardless of outcome
            db_verifyToken.findByIdAndDelete(doc_verifyToken._id).exec()
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
    db_authToken.deleteOne({ token: cookie }).exec()
}
//TODO Define implementation
/** NOT IMPLEMENTED YET
 * Deletes all authentication tokens associated with an account, essentially signing them out of all other devices.
 * Should not delete the token used to invoke this request
 * @param {Express.Response} res 
 */
async function DeleteAllAssociatedTokens(res) {
    throw "Method not Implemented"
}


module.exports = { CreateAuthToken, CheckVerifyToken, CreateVerifyToken, CheckAuthToken, DeleteToken };