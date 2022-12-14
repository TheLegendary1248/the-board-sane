//TODO DO COOKIE RESEARCH IN GENERAL
const db_authToken = require('../schema/authenticationToken')
const db_verifyToken = require('../schema/verificationToken')
const db_user = require('../schema/user')
const bcrypt = require('bcrypt')
const salt = 9;
const uuid = require('uuid');
const { Mongoose, default: mongoose } = require('mongoose');
const express = require('express')
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
 * @param {express.Response} res The response object to the request. Used in setting cookies Session and UserID, therefore headers must not be sent prior
 * @param {db_user} doc_user The User's Document. Used instead of ID to ensure ID exists
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
            res.cookie("SessionVal", "NULL")
            res.cookie("SessionID", "0000")
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
            res.cookie("SessionVal", token)
            res.cookie("SessionID", doc_authToken.id)
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
 * @param {express.Request} req The request object
 * @returns {Promise<db_user>} The User document associated with the token
 */
//TODO Add return for token expiration, aka log out user after set time
//Checks the authentication token that SHOULD be set as part of the cookies
async function CheckAuthToken(req) {
    let userID = req.cookies.UserID
    let sessionVal = req.cookies.SessionVal
    let sessionID = req.cookies.SessionID
    req.logger.includeCookies = true; 
    if (!mongoose.isValidObjectId(userID)) 
    {   //Validate userID cookie
        req.logger.warn(__filename, `: CheckAuthToken: UserID cookie(${userID}) is not valid`.yellow); return null; } 
    if (!mongoose.isValidObjectId(sessionID)) 
    {   //Validate session ID
        req.logger.warn(__filename, `: CheckAuthToken: SessionID cookie(${sessionID}) is not a valid Object ID`.yellow); return null;}
    if (!uuid.validate(sessionVal)) 
    {   //Validate session token
        req.logger.warn(__filename, `: CheckAuthToken: SessionVal cookie(${sessionVal}) is not valid`.yellow); return null; }
    req.logger.includeCookies = false; 
    req.logger.log(`Checking Auth Token ( UserID: ${userID}, SessionVal: ${sessionVal}), SessionID: ${sessionID})`)
    let doc_user = await db_user.findById(userID).lean().exec()
    if (doc_user === null) 
    {   //Check user document existence
        req.logger.warn(__filename, ": CheckAuthToken: User does not exist".yellow)
        return null; }
    //Check the given ID of the session token
    let doc_token = await db_authToken.findById(sessionID).lean().exec()
    if (doc_token === null) 
    {   //If the token does not exist
        req.logger.log(__filename, ": CheckAuthToken: Session token does not exist".yellow)}
    else if (!doc_token.user.equals(doc_user._id)) 
    {   //If the belonging user of the token does not match
        req.logger.log(__filename, ": CheckAuthToken: User ID cookie does not match".yellow)}
    else if (await bcrypt.compare(sessionVal, doc_token.token))
    {   //If the token is valid
        req.logger.log(__filename, ": CheckAuthToken: Token is valid".green);
        return doc_user; }
    else 
    {   //I think you get the gist
        req.logger.log(__filename, ": CheckAuthToken: Session token is not correct".yellow)}
    return null;
}
/**
 * Same as CheckAuthToken, but automatically responds to unauthorized requests
 * @param {express.Request} req The request object
 * @param {express.Response} res The response object
 * @returns {Promise<db_user>} The User document associated with the token
 */
async function CheckAuthTokenCatchInvalid (req, res)
{
    let doc_user = await CheckAuthToken(req)
    
    if(!doc_user) res.status(401).end()
    return doc_user;
}
/**
 * Creates a verification token. Used in verification of email or when password is forgotten
 * @param {db_user} doc_user The associated User's document
 * @returns {string} The token
 */
async function CreateVerifyToken(doc_user) {
    let token = uuid.v4();
    let hash = await bcrypt.hash(token, salt)
    console.log("Creating new verification token:".yellow, token);
    //Check for a previous token, probably from a resubmit
    let previousToken = await db_verifyToken.findOne({ user: doc_user._id }).exec()
    //If it doesn't exist, create a new one that expires in five minutes 
    if (!previousToken) {
        db_verifyToken.create({ token: hash, user: doc_user._id })
    }
    //Otherwise, overwrite it, with a new one that expires in five minutes
    else {
        console.log("Verification token already exists:", previousToken)
        previousToken.token = hash
        previousToken.save()
    }
    //The token is not required to be unique so we can always return it without needing a check
    return token;
}
/**
 * Checks the verification token. The token gets deleted in the process if it exists, and the user is given an authentication token. 
 * NOTE that this function already sends a response
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function CheckVerifyToken(req, res) {
    
    let userID = req.body.userID
    let token = req.body.token
    if(!mongoose.isValidObjectId(userID)) 
    {   //Validate given userID
        console.warn(__filename, `: User ID (${userID}) is not valid`.yellow); res.status(400).end(); return}
    if(!uuid.validate(req.body.token))
    {   //Validate token
        console.warn(__filename, `: Token (${token}) is not valid`.yellow); res.status(400).end(); return}
    console.log(`Verifying with UserID(${userID}) Token(${token})`)
    let doc_user = await db_user.findById(req.body.userID, "_id name").exec()
    //If document exists
    if(!doc_user) 
    {   //User document is null
        console.warn("Verification: Account does not exist".yellow); 
        res.status(404).send("Verification / Bad request. Body 'userID' key is not valid"); return}
    let doc_verifyToken = await db_verifyToken.findOne({user: doc_user._id}).exec()
    if(!doc_verifyToken)
    {   //Verify Token document is null
        console.warn("Verification: Token does not exist".yellow); 
        res.status(400).send("Verification / Bad request. Body 'token' key is not valid"); return}
    if(!await bcrypt.compare(req.body.token, doc_verifyToken.token)) 
    {   //If token fails to match hash
        console.warn("Verification: Token hash does not match".yellow)
        res.status(403).send("Verification failed"); return}
    //Delete verification token regardless of outcome
    db_verifyToken.findByIdAndDelete(doc_verifyToken._id).exec()  
    if(doc_verifyToken.expired)
    {   //Token expired
        console.log("Verification: Token has expired".yellow); res.status(403).send("Verifcation failed"); return }
    //Token IS NOT expired
    console.log("Verification: Succeeded".green)
    let newpass = req.body.newpass
    if(typeof(newpass) === 'string')
    {   //If body requests change password
        let hash = await bcrypt.hash(newpass, 12)
        doc_user.pass = hash;}
    await CreateAuthToken(res, doc_user)
    res.status(201).send(doc_user.name)
    doc_user.verified = true
    doc_user.save()
      
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
 * @param {express.Response} res 
 */
async function DeleteAllAssociatedTokens(res) {
    throw "Method not Implemented"
}


module.exports = { CreateAuthToken, CheckVerifyToken, CreateVerifyToken, CheckAuthToken, DeleteToken, CheckAuthTokenCatchInvalid };