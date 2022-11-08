//TODO DO COOKIE RESEARCH IN GENERAL
const Token = require('../schema/token')
const User = require('../schema/user')
const { randomBytes } = require('crypto')
const bcrypt = require('bcrypt')

//Function that creates new tokens
function CreateNewToken (res, user)
{   
    //TODO Check for duplicates
    //TODO Hash token
    let token = randomBytes(72).toString('hex')
    console.log(token)
    Token.create({token: token, expires: Date(), user: user._id})
    res.cookie("Session", token)
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