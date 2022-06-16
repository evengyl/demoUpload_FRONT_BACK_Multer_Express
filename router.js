const express = require("express")
const router = express.Router()
const { upload } = require("./controllers/multer.controller")


router.get('/', (req, res, next) => { 
    res.render("index.ejs")
 })
 
 
 router.post("/simple", upload.single('simple'), (req, res) => {
   console.log(req)
     res.redirect("/")
 })
 
 
 router.post("/multi", upload.array('multi', 10), (req, res) => {
     res.redirect("/")
 })


module.exports = router