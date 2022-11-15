//Schema for paths, lines connecting two pieces of "item"
const mongoose = require("mongoose")

//A path should reference the item it connects, the kind of path
//And any text on it
const itemPath_s = new mongoose.Schema({
    //The text the path has
    text:{type:String},
    //The type of path it is
    //In this concept, is it a ray, line, segment, etc?
    type:{type:Number},
    //Version of the item
    version: {type: Number, validate: {validator : Number.isInteger, message: '{VALUE} is not an integer value'}},
    //The board the path belongs to
    board:{type: mongoose.Schema.Types.ObjectId},
})

module.exports = mongoose.model("item_Path", itemPath_s)