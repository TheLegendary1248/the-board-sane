//Schema for a user, should be self explanatory enough
const mongoose = require("mongoose")
const Board = require("./board")

const user_s = new mongoose.Schema({
    //The username of the user
    name:{type:String, required:true, unique: true},
    //The password of the user
    pass:{type:String},
    //The email of the user
    email:{type:String, required:true, unique: true},
    //If the email has been validated
    validated: {type:Boolean},
    //Time of account creation
    creationDate:{type:Date},
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