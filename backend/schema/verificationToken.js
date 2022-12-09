//Schema for verification tokens. Used in the creation of new accounts and loss of password
const mongoose = require("mongoose")

const verifyToken_s = new mongoose.Schema({
    //The token of the user
    token: {type: String, required:true},
    //User the token is for
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required:true} 
})

verifyToken_s.virtual('expired').get(
    /**
     * Gets the expiration date of this token
     * @returns {Boolean}
     */
    function GetExpiration(){
    return (Date.now() - this._id.getTimestamp()) > 360_000
})
module.exports = mongoose.model('VerifyToken', verifyToken_s)