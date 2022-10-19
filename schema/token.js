//Schema for tokens, which keep the user logged in should the cookie set on the client's browser match match
const mongoose = require("mongoose")

const token_s = new mongoose.Schema({
    //The token of the user
    token: {type: String},
    //Expiration date of the token
    expires: {type: Date},
    //User the token is for
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'} 
})

module.exports = mongoose.model('Token', token_s)