//User schema
const mongoose = require("mongoose")

const user_s = mongoose.Schema({
    name:{type:String},
    pass:{type:String},
})

module.exports = user_s