//Modules
require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();

// serve static front end in production mode
if (process.env.NODE_ENV === "production") {
  console.log("Using production mode")
  app.use(express.static(path.join(__dirname, 'client', 'build')));
}
app.get('/main', function(req,res){
  res.send('This is the main page')
})
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('*', (req, res) => {
  console.log("Failed to get page")
  res.send("404 Failed to get page")
})

app.listen(process.env.PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", process.env.PORT);
});