//Schema for a user, should be self explanatory enough
const mongoose = require("mongoose")

const user_s = mongoose.Schema({
    //The username of the user
    name:{type:String},
    //The password of the user
    pass:{type:String},
})

module.exports = user_s