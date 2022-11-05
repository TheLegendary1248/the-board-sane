//Schema for a board. A board is a collection of item that a user (or multiple users in the unlikely and far future) can modify
const mongoose = require("mongoose")

const board_s = new mongoose.Schema({
    //The title/name of the board
    name:{type:String},
    //The user the board belongs to
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
    
})

//TODO Use programmatic looping to get all item schemas in "item" and apply a virtual to all

//Virtual
board_s.virtual('Board', 
{ref: 'Board', 
localField:'_id',
foreignField: 'board'})

module.exports = mongoose.model("Board", board_s)