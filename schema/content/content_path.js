//Schema for paths, lines connecting two pieces of "content"
const mongoose = require("mongoose")

const contentPath_s = new mongoose.Schema({
    text:{type:String},
    type:{type:Number},
})

module.exports = contentPath_s