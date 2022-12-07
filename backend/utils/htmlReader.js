//Utility Html File reader, currently purposed for html emails
const fs = require("fs/promises")
//Variable that holds already read files
var readFiles = {}

/**
 * Gets HTML file at path
 * @param {string} path 
 * @returns {HTMLObject}
 */
async function GetHtmlFile(path){
    if ( readFiles[path] != null)
    {
        let file = readFiles[path]
        let m = new HTMLObject(file);
        return m;
    }
    else {
        let file = await fs.readFile(path, {encoding: 'utf-8'})
        readFiles[path] = await file; 
        return new HTMLObject(file);
    }
}
class HTMLObject {
    /**
     * Constructs a simple HTML representation object from the given string
     * @param {string} html 
     */
    constructor(html){
        //Separate the html by %
        let strs = html.split("%%")
        //console.log("Split",strs)
        this.parts = []
        this.inserts = {}
        for (let i = 0; i < strs.length; i++) 
        {
            if(i % 2 == 0) this.parts[i / 2] = strs[i]
            else this.inserts[strs[i].toLowerCase()] = strs[i].toLowerCase()
        }
    }
    Join() {
        let arr = []
        let keys = Object.keys(this.inserts)
        for (let i = 0; i < this.parts.length; i++) {
            arr.push(this.parts[i])
            arr.push(this.inserts[keys[i]])
        }
        return arr.join('')
    }
}

module.exports= { GetHtmlFile }