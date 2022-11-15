//Schema for a note, a simple box of editable text
const mongoose = require('mongoose')

//The note should contain the text it has, formattin
const itemClock_s = new mongoose.Schema({
    //Whether the stopwatch or timer is enabled
    enabled: {type: Boolean},
    //The time the timer or stopwatch is set for. Will instead be an time offset when not enabled
    time: {type: Date}, 
    //The board the note belongs to
    board:{type: mongoose.Schema.Types.ObjectId, ref:'Board'},
})

module.exports = mongoose.model("item_Clock", itemClock_s)