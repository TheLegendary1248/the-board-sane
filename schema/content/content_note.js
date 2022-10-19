//Schema for a note, a simple box of editable text
const mongoose = require('mongoose')

//The note should contain the text it has, formattin
const contentNote_s = new mongoose.Schema({
    //The title of the note
    title: {type:String},
    //The containing text of the note
    text: {type:String}, 
    //The board the note belongs to
    board:{type: mongoose.Schema.Types.ObjectId, ref:'Board'},
})

module.exports = mongoose.model("content_Note", contentNote_s)