//Schema for tokens, which keep the user logged in should the cookie set on the client's browser match match
const mongoose = require("mongoose")

const token_s = new mongoose.Schema({
    //The token of the user
    token: {type: String, required:true, unique: true},
    //Expiration date of the token
    //NOTE: We use a date here since it is planned to give the user the option as to when authentication tokens expire. Therefore, these should be precomputed
    expires: {type: Date, required:true},
    //User the token is for
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true} 
})

module.exports = mongoose.model('AuthToken', token_s)