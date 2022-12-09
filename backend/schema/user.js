//Schema for a user, should be self explanatory enough
const mongoose = require("mongoose")
const Board = require("./board")

const user_s = new mongoose.Schema({
    //The username of the user
    name:{type:String, required:true, unique: true},
    //The password of the user
    pass:{type:String, required:true},
    //The email of the user
    email:{type:String, required:true, unique: true},
    //If the email has been verified. If not, the account is to not be considered existent
    verified: {type:Boolean, required:true, default:true},
    /** When this user's profile was last updated */
    lastModified: {type:Date}
}, {toJSON: {virtuals: true}})


//Virtual
user_s.virtual('Board', 
{ref: 'Board', 
localField:'_id',
foreignField: 'user'})

user_s.virtual('Token', 
{ref: 'Token', 
localField:'_id',
foreignField: 'user'})
module.exports = mongoose.model('User',user_s)