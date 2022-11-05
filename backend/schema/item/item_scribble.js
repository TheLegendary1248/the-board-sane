//Schema for a scribble, otherwise a drawing made in the app
const mongoose = require("mongoose")

//Will figure this out some other time..
//I want to use vector drawings, but I don't know how SVG in html quite works. I've made bezier curves, but it's format is confusing
const itemScribble_s = new mongoose.Schema({
    //The SVG path of the scribble
    path: {},
    //The board it scribble belongs to
    board:{type: mongoose.Schema.Types.ObjectId},
})

module.exports = mongoose.model("item_Scribble", itemScribble_s)