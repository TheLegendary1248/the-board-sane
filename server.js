//Modules
require('dotenv').config()

const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose')

//Connect to mongodb : Haven't setup the database yet
//mongoose.connect(process.env.MONGO)
console.log(`Time of server start: ${Date()}`)

//Settings
app.use(express.urlencoded({ extended: true }))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

//Does this code even exist for a good reason anymore?
if (process.env.NODE_ENV === "production") {
  console.log("Using production mode")
  app.use(express.static(path.join(__dirname, 'public')));
}
else {
  app.use(express.static('public'))
}

//Access the api controller for programmatic things
app.use('/api', require('./controllers/api'))

//The main page
app.get('/home', (req, res) => res.render("main"))

//The about page
app.get('/about', (req,res) => res.render("about"))

//The error page
app.get('*', (req, res) => {
  console.log(`Failed to get page at ${req.originalUrl}`)
  res.send(`404 Failed to get page at ${req.originalUrl}`)
})

//Listen
app.listen(process.env.PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", process.env.PORT);
});