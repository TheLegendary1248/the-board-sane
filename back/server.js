//Modules
//TODO Eventually, might want to split backend and frontend, as you can see the cracks between them widening
//TODO Review http status codes and ensure the right ones are returned
//You gotta be fucking kidding me that I need to trim a single white space
//Because that's what's been causing dotenv to not find the appropiate file
console.log(`${process.env.NODE_ENV.trim()}`)
require('dotenv').config({debug:true, path: ".env."+process.env.NODE_ENV.trim()})
//
console.log(process.env.FAILED)
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

//Connect to mongodb : Haven't setup the database yet
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
},
() => {console.log('Connection to mongo: ', process.env.MONGO)})
console.log("PATH",`.env.${process.env.NODE_ENV}`)
console.log(`Time of server start: ${Date()}`)

//Settings
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", `http://localhost:${process.env.PORT}`);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//ok code
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Does this code even exist for a good reason anymore?
if (process.env.NODE_ENV === "production") {
  console.log("Using production mode")
  app.use(express.static('build'));
}
else {
  console.log("Using development mode")
  app.use(express.static('public'))
}
app.get('/hello', (req, res) => res.send("Hello to you"))
//Access the api controller for programmatic things
app.use('/api', require('./controllers/api'))
app.use('*', (req, res) => res.sendFile("./", {
  root: path.join(__dirname, 'build')}
))
/*
//The about page
app.get('/about', (req,res) => res.render("about"))

//The login page
app.get('/login', (req,res) => 
{
  console.log("Hi")
  let rend = (e) => res.render("login", e)
  let e = req.query["error"]
  console.log(e)
  if(e == undefined) res.render("login")
  else switch (e) {
    case "incorrect":
      rend({message:"Username or password is incorrect"})
      break;
    case "dupe":
      rend({message: `Hey! I said that '${req.query["name"]}' is unavailable`})
      break;
    default:
      rend({message:"An error has occurred"})
      break;
  }
  
})
//A testing page, for frontend debugging nonsense
app.get('/ohno', (req, res) => res.render("test"))

//The default view as is
app.get('/plain', (req, res) => res.render("default"))

//The board page
app.use('/board', require('./controllers/board'))

//Test react page
app.get('/try', (req, res) => res.render("react"))

//The main page
app.get('/', (req, res) => res.render("home"))

//The error page
app.get('*', (req, res) => {
  //console.log(`Failed to get page at ${req.originalUrl}`)
  res.render("error")
})
*/
//Listen
app.listen(process.env.BACK_PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on port:", process.env.BACK_PORT);
});

//TODO Add dumb easter eggs when i've presented

module.exports = app