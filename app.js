const express = require("express")
const app = express()
const port = 3333
const path = require("path")
const { v4 : uuid } = require("uuid")

/* multer part */
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) 
    {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) 
    {
      let extensionOrigin = path.extname(file.originalname)
      cb(null, uuid() + '.' + extensionOrigin)
    }
  })



const fileFilter = (req, file, cb) => {
    let ext = path.extname(file.originalname);

    if(ext !== '.PNG' && ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') 
    {
        return cb(new Error('Only images are allowed'))
    }

    cb(null, true)
}

  
const upload = multer({storage : storage, fileFilter : fileFilter })



app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.use(express.static('content'));
app.engine('html', require('ejs').renderFile);


app.get('/', (req, res, next) => { 
   res.render("index.ejs")
})


app.post("/simple", upload.single('simple'), (req, res) => {
    res.redirect("/")
})


app.post("/multi", upload.array('multi', 10), (req, res) => {
    res.redirect("/")
})


app.listen(port, console.log(`Les serveur Express écoute sur le port ${port}`))