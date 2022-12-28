console.log("Time of server start:", new Date().toLocaleString())

//REQUIRE MODULES
require('dotenv').config()
//Configure secrets, on local computer
require('dotenv').config({debug:true, path: '.env.secrets'})
//Do not question my choices - let a person's creations stand alone from their actions
require('colors')


const express = require('express');
const app = express();
const mongoose = require('mongoose')
const db_log = require('./schema/logs')
const cookieParser = require('cookie-parser')
//CONFIGURE MODULES
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}, () => {console.log('Connected to mongo')})
////Setup external library middleware
//Parse request cookies
app.use(cookieParser())
//Handle both 'Content-Type's of json and plain text
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

//TODO Access control
//Setup our middleware
app.use((req, res, next) => {
  //TODO Write log object
  const logger = {
      _id: new mongoose.Types.ObjectId(),
      logs: [],
      flaggedLogs: [],
      shouldBeSaved: false,
      severity: 0,
      path: req.originalUrl,
      includeBody: false,
      includeCookies: false,
      log(...str) 
      {
        if(process.env.NODE_ENV=="development") console.log(`Request Instance(${this._id}):`.brightBlue,...str)
        this.logs.push(str.join(" ")); },
      warn(...str) 
      {
        if(process.env.NODE_ENV=="development") console.warn(`Request Instance(${this._id}):`.brightBlue, ...str)
        this.logs.push(str.join(" "));
        this.shouldBeSaved = true; 
        this.severity = 1 > this.severity ? 1 : this.severity; 
        this.flaggedLogs.push(this.logs.length); 
        },
      error(...str) 
      {
        if(process.env.NODE_ENV=="development") console.error(`Request Instance(${this._id}):`.brightBlue,...str)
        this.logs.push(str.join(" "));
        this.shouldBeSaved = true; 
        this.severity = 2 > this.severity ? 2 : this.severity; 
        this.flaggedLogs.push(this.logs.length); 
        },
      async finalize() 
      { //Finishes work with logs
        if(!this.shouldBeSaved)
        { //If the log shouldn't be saved
          console.log(`Request log ${this._id} was discarded`); return}
        switch (flagSeverity) 
        { //Console log flags
          case 0:
            console.log(`Request logged at ${this._id}`.cyan)
            break;
          case 1:
            console.warn(`Request logged at ${this._id} with warning`.yellow)
            break;
          case 2:
            console.warn(`Request logged at ${this._id} with error`.red)
            break;
        }
        //delete this.shouldBeSaved
        if(this.includeBody) {this.body= req.body}
        if(this.includeCookies) {this.cookies= req.cookies}
        //delete this.includeBody
        try {await db_log.create(this)}
        catch(error) { console.error(`Error trying to log request ${this._id}`.red,error) }
      }
  }
  req.logger = logger
  req.logger.log("Hello world")
  //res.header("Access-Control-Allow-Origin", `http://localhost:${process.env.PORT}`);
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //Server options
  if(req.get('X-Delay-Response') !== undefined)
  {

  }
  if(req.get('X-Enable-Logging') !== undefined) 
  { //Enables logging of user's actions saved as a mongodb document. FORCE ENABLE on more serious actions
    logger.shouldBeSaved = true
  }
  if(!!req.body.serverOptions){
    if(req.body.serverOptions.fakeResponse !== undefined) 
    { //Ask for a fake response. True to return a fake success, false to return a fake fail. 
      console.log("Request asked to be fake. Success?".cyan, req.body.serverOptions.fakeResponse = !!req.body.serverOptions.fakeResponse)
      req.body.useFakeResponse = true;
      req.body.fakeResponse = req.body.serverOptions.fakeResponse;
    }
    if(!!req.body.serverOptions.delay) 
    { //Server delay to respond to request to test how the client handles long-pending requests to api
      console.log("Request delayed by".cyan, req.body.serverOptions.delay, "milliseconds")
      setTimeout(next, req.body.serverOptions.delay)
      return;
    }
  }
  res.on('finish', async () => {
    logger.finalize()
  })
  next();
}); 

/*
app.use((err, _, _n, next) => {
  console.error("Something went horribly wrong".bgred)
  res.status(500).send("Something went horribly wrong")
}) */

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

//FIXME Alias all mongoose Schemas
//TODO Enforce time between requests
//TODO Force failure if not everything is setup properly
//FIXME ADD LOGGING SYSTEM