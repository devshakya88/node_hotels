const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const personRoutes = require('./routes/personRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes');


app.use('/person', personRoutes);
app.use('/menu',menuItemRoutes);


app.get('/', function(req, res){
    res.send('Welcome to our Hotel')
})

app.listen(8000, () => {
  console.log("Server is Listening on Port 8000");
});
