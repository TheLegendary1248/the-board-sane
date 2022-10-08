//Schema for tokens, which keep the user logged in should the cookie set on the client's browser match match
const mongoose = require("mongoose")

const token_s = new mongoose.Schema({
    token: {type: String},
    expires: {type: Date}
})

module.exports = token_s