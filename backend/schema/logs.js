//Schema for a board. A board is a collection of item that a user (or multiple users in the unlikely and far future) can modify
const mongoose = require("mongoose")

const log_s = new mongoose.Schema({
    //The logs
    log: [{type: String, required:true, alias: 'logs'}],
    //Pointers to which logs are important
    ptr: [{type:Number, required: true, alias: 'flaggedLogs'}],
    //Severity of the log
    svr: {type: Number, enum: [0,1,2], required: true, alias: 'severity'},
    //Cookies of the request, if it pertains to the errors
    c: {type:Object, alias:'cookies'},
    //Body of the request, if it pertains to the errors
    b: {type:Object, alias:'body'}
})

module.exports = mongoose.model("Logs", log_s)