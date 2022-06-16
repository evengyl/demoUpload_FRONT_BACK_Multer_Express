const express = require("express")
const app = express()
const port = 3000

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.engine('html', require('ejs').renderFile);


app.all("*", (req, res) => {
  console.log(req)
  res.end()
})

const routage = require("./router")
app.use("/", routage)


app.listen(port, console.log(`Les serveur Express écoute sur le port ${port}`))