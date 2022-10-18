//Modules
//TODO Review http status codes and ensure the right ones are returned
require('dotenv').config()

const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose')
const cookierParser = require('cookie-parser')

//Connect to mongodb : Haven't setup the database yet
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
},
() => {console.log('Connection to mongo: ', process.env.MONGO)})

console.log(`Time of server start: ${Date()}`)

//Settings
app.use(cookierParser())
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

//The about page
app.get('/about', (req,res) => res.render("about"))

//The login page
app.get('/login', (req,res) => 
{
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

//The main page
app.get('/', (req, res) => res.render("home"))

//The error page
app.get('*', (req, res) => {
  //console.log(`Failed to get page at ${req.originalUrl}`)
  res.render("error")
})

//Listen
app.listen(process.env.PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", process.env.PORT);
});

//TODO Add dumb easter eggs when i've presented

module.exports = app