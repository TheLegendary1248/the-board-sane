//Component to render a note
//TODO Have a css file per component if possible
const React = require('react')

//TODO PUT STYLING IN CSS FILE
//TODO Probably use value instead of inserting text within the element
function Note(data){
    <div class="Content Note" draggable="true" style={{width: data.width, height: data.height, resize: "both", overflow: "auto",}}>
        <label>
            <textarea placeholder='Title' rows='1' wrap='off' style={{position: "relative",width: "calc(100% - 10px)", height: "20px", resize:"none", whiteSpace:"nowrap", overflow:"hidden"}}>
                {data.title}
            </textarea>
        </label>
        <textarea placeholder='Type anything here!'style={{ width: "calc(100% - 10px)", height: "calc(100% - 45px)", resize:"none"}}>
            {data.text}
        </textarea>
    </div>
}

module.exports = Note