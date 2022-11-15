//Schema for a note, a simple box of editable text
const mongoose = require('mongoose')

//The note should contain the text it has, formattin
const itemNote_s = new mongoose.Schema({
    //The containing text of the note
    text: {type:String}, 
    //Version of the item
    version: {type: Number, validate: {validator : Number.isInteger, message: '{VALUE} is not an integer value'}},
    //The board the note belongs to
    board:{type: mongoose.Schema.Types.ObjectId, ref:'Board'},
})

module.exports = mongoose.model("item_Note", itemNote_s)