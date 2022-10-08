//Modules
require('dotenv').config()
console.log(process.env)
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose')
//Connect to mongodb
mongoose.connect(process.env.MONGO)

//Settings
app.use(express.urlencoded({ extended: true }))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
// serve static front end in production mode
if (process.env.NODE_ENV === "production") {
  console.log("Using production mode")
  app.use(express.static(path.join(__dirname, 'client', 'build')));
}
else {
  app.use(express.static('public'))
}

app.use('/api', require('.controllers/api'))

app.get('/', function(req,res){
  res.render('main')
})
app.get('/')

app.get('*', (req, res) => {
  console.log("Failed to get page")
  res.send("404 Failed to get page")
})

app.listen(process.env.PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", process.env.PORT);
});