//Schema for verification tokens. Used in the creation of new accounts and loss of password
const mongoose = require("mongoose")

const verifyToken_s = new mongoose.Schema({
    //The token of the user
    token: {type: String},
    //Expiration date of the token
    expires: {type: Date},
    //User the token is for
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true} 
})

module.exports = mongoose.model('VerifyToken', verifyToken_s)