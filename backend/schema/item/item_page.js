//Schema for a note, a simple box of editable text
const mongoose = require('mongoose')

//The note should contain the text it has, formattin
const itemPage_s = new mongoose.Schema({
    //The title of the note
    title: {type:String},
    //The containing text of the note
    text: {type:String}, 
    //Version of the item
    version: {type: Number, validate: {validator : Number.isInteger, message: '{VALUE} is not an integer value'}},
    //The board the note belongs to
    board:{type: mongoose.Schema.Types.ObjectId, ref:'Board'},
})

module.exports = mongoose.model("item_Page", itemPage_s)