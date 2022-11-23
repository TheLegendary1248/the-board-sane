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

//Setup external library middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//TODO Access control
//Setup our middleware
app.use((req, res, next) => {
  //console.log("Ip address of request", req.ip)
  //res.header("Access-Control-Allow-Origin", `http://localhost:${process.env.PORT}`);
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //Server options
  if(!!req.body.serverOptions){
    if(req.body.serverOptions.fakeResponse !== null) //Ask for a fake response. True to return a fake success, false to return a fake fail
    {
      console.log("Request asked to be fake. Success?", req.body.serverOptions.fakeResponse)
      req.body.useFakeResponse = true;
      req.body.fakeResponse = req.body.serverOptions.fakeResponse;
    }
    if(!!req.body.serverOptions.delay) //Server delay to respond to request to test how the client handles long-pending requests to api
    {
      console.log("Request delayed by", req.body.serverOptions.delay, "milliseconds")
      setTimeout(next, req.body.serverOptions.delay)
      return;
    }
  }
  next();
}); 

//API route for most requests
app.use('/api', require('./controllers/api'))

//Refusal to serve coffee
app.get('/coffee', 
(_, res) => res.status(418).send("Nope"))

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