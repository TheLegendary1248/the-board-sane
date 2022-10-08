//Schema for a board. A board is a collection of content that a user (or multiple users in the unlikely and far future) can modify
const mongoose = require("mongoose")

const contentBoard_s = new mongoose.Schema({
    //The title/name of the board
    name:{type:String},
    //The user the board belongs to
    user: {type: mongoose.Schema.Types.ObjectId}
    
})

module.exports = contentBoard_s