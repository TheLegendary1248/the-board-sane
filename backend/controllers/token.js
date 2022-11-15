//TODO DO COOKIE RESEARCH IN GENERAL
const Token = require('../schema/token')
const User = require('../schema/user')
const { randomBytes } = require('crypto')
const bcrypt = require('bcrypt')

//Function that creates new tokens
async function CreateNewToken (res, user, type)
{   
    let token = randomBytes(72).toString('hex')
    console.log(token)
    //Authentication token
    if(type == "auth") {
        //TODO Check for all authentication tokens. Allow a limit of 8 sign ins, or defined by the usr
        Token.create({token: token, expires: new Date(), user: user._id, type:"auth"})
        //Set the session cookies
        res.cookie("Session", token)
        res.cookie("UserID", user._id)
    }
    //Verify Email
    else if (type == "verify") {
        //Verification tokens
        Token.create({token: token, expires: new Date(), user: user._id, type:"verify"})
    }
    //Forgot password
    else if (type === "forgot") {
        //Check for a previous token, probably from a resubmit
        let previousToken = await Token.findOne({user: user._id, type:"forgot"}).exec()
        //If it doesn't exist, create a new one that expires in five minutes 
        if(previousToken == {}) Token.create({token: token, expires: (new Date() + 360000), user: user._id, type:"forgot"})
        //Otherwise, overwrite it, with a new one that expires in five minutes
        else {
            previousToken.token = token
            previousToken.expires = new Date() + 360000
            previousToken.save()
        }    
    }
    //TODO Add user id with token
}
//Function that checks for token
//TODO Add return for token expiration, aka log out user after set time
//FIXME Hash token, and give the user unhashed version
async function CheckToken(req)
{
    console.log(req.cookies)
    //Check if the user has a Session token to begin with
    if(req.cookies.Session === null) return null;
    //Get token in database
    let retrieved = await Token.exists({token: req.cookies.Session}).lean().exec()
    //If token does not exist
    if(retrieved === null) return null;
    else { 
        //Get user
        let user = await Token.findById(retrieved._id).exec()
        //If user by chance does not exist, also return empty
        //TODO Delete token on this condition
        if(user === null) return null;
        //Otherwise return it
        else { return user; }
    }
} 
async function DeleteToken(res)
{
    let cookie = res.cookie.Session
    res.clearCookie("Session")
    Token.deleteOne({token: cookie}).exec()
}


module.exports = {CreateNewToken, CheckToken, DeleteToken};