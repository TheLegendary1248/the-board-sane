//REQUIRE MODULES
//TODO Review http status codes and ensure the right ones are returned
require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

//CONFIGURE MODULES
//Connect to mongodb
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
},
() => {console.log('Connection to mongo: ', process.env.MONGO)})
console.log(`Time of server start: ${Date()}`)
/* TEST WITHOUT, SET LATER
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", `http://localhost:${process.env.PORT}`);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); */
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Access the api controller for programmatic things
app.use('/api', require('./controllers/api'))

//Overall check the thing is responding
app.get('/', (req, res) => res.sendFile("hi.html", { root: __dirname }) )
app.get('*', (req,res) => res.status(404).end())
/*
app.use('*', (req, res) => res.sendFile("./", {
  root: path.join(__dirname, 'build')}
)) */
//Listen on port
app.listen(process.env.PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on port:", process.env.PORT);
});
//TODO Add dumb easter eggs when i've presented

module.exports = app