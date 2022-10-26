//Api path for getting website news and updates, like EVERYONE has one but no one cares to pay attention to
const router = require("express").Router()

//More Psuedo code
var path;
var db;

//Add news post
path.post("/", (req,res)=>{
    db.News.add(res.body)
})

//Get news posts for said page
path.get("/:startIndex/:limit", (req, res) => {
    let data = db.News.Get({startFrom:req.params.startIndex,limit: req.params.id})
    res.send(data)}
)
