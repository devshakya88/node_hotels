const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Set the port to use environment variable or default to 3000
const PORT = process.env.PORT || 3000;

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

app.get('/', function(req, res) {
    res.send('Welcome to our Hotel');
});

app.listen(PORT, () => {
    console.log(`Server is Listening on Port ${PORT}`);
});
