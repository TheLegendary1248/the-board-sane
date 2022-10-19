//Schema for a user, should be self explanatory enough
const mongoose = require("mongoose")
const board = require("./board")

const user_s = mongoose.Schema({
    //The username of the user
    name:{type:String},
    //The password of the user
    pass:{type:String},
    //The email of the user
    email:{type:String},
    //Time of account creation
    creationDate:{type:Date},
})


//Virtual
user_s.virtual('Board', 
{ref: 'Board', 
localField:'_id',
foreignField: 'user'})

module.exports = mongoose.model('User',user_s)