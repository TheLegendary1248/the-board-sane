console.log("Time of server start:", new Date())

//REQUIRE MODULES
require('dotenv').config()
//Configure secrets, on local computer
require('dotenv').config({debug:true, path: '.env.secrets'})

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

//CONFIGURE MODULES
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}, () => {console.log('Connected to mongo')})

//TODO Access control
app.use((req, res, next) => {
  //console.log("Ip address of request", req.ip)
  //res.header("Access-Control-Allow-Origin", `http://localhost:${process.env.PORT}`);
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//API route for most requests
app.use('/api', require('./controllers/api'))

//Main route, if someone manages to get the Cloud Run URL
app.get('/', (_, res) => res.sendFile("hi.html", { root: __dirname }) )

//Standard 404 on all miscellanous routes
app.get('*', (_,res) => res.status(404).end())

//Listen on port
app.listen(process.env.PORT, err => {
    if (err) console.log(err);
    console.log("Server listening on port:", process.env.PORT);
});

module.exports = app

//TODO Force failure if not everything is setup properly
//TODO Add dumb easter eggs when i've presented
//FIXME Review http status codes and ensure the right ones are returned for all endpoints