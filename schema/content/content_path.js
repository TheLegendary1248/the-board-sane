//Schema for paths, lines connecting two pieces of "content"
const mongoose = require("mongoose")

//A path should reference the content it connects, the kind of path
//And any text on it
const contentPath_s = new mongoose.Schema({
    //The text the path has
    text:{type:String},
    //The type of path it is
    //In this concept, is it a ray, line, segment, etc?
    type:{type:Number},
    //The board the path belongs to
    board:{type: mongoose.Schema.Types.ObjectId},
})

module.exports = contentPath_s