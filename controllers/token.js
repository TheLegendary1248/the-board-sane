const Token = require('../schema/token');
const User = require('../schema/user')

//Token related functions
let tFunc = {
CreateNewToken: function (res)
{   
    //TODO Check for duplicates
    let token = uuidv4();
    Token.create({token: token, expires: Date(), user: retrieved._id})
    res.cookie("Session", token)
},
//Function that checks for token
//TODO Add return for token expiration, aka log out user after set time
CheckToken: async function (req)
{
    //Check is the user has a Session token to begin with
    if(req.cookies.Session === null) return false
    //Get token in database
    let retrieved = await Token.exists({token: req.cookies.Session}).exec()
    //If token does not exist
    if(retrieved === null) return false;
    else { 
        //Get user
        let user = await Token.findById(retrieved._id).exec()
        //If user by chance does not exist, also return false
        //TODO Delete token on this condition
        if(user === null) return false;
        //Otherwise return it
        else { return user; }
    }
}
}

module.exports = tFunc;