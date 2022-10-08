//Schema for user's content
const mongoose = require('mongoose')

const contentNote_s = new mongoose.Schema({
    text: {type:String,},
    board: {type: mongoose.Schema.Types.ObjectId},
    
})

module.exports = contentNote_s