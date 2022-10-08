//Schema for a note, a simple box of editable text
const mongoose = require('mongoose')

//The note should contain the text it has, formattin
const contentNote_s = new mongoose.Schema({
    //The containing text of the note
    text: {type:String,}, 
    //The board the note belongs to
    board:{type: mongoose.Schema.Types.ObjectId},
})

module.exports = contentNote_s