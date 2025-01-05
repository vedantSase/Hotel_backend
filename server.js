const express = require('express');
const nodash = require('nodash');
const app = express();
// Importing local files
const db = require('./db');
require('dotenv').config();

//  getting port number for listening from .env file
const PORT = process.env.Port || 3000 ; 


// converting the data taken from UI to Json format
const bodyParser = require('body-parser');
const showMenus = require('./Models/Menus');
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Welcome to our Hotel');
})

// getting  routes 
const PersonRoute  = require('./Routes/PersonRoute');
const MenuRoute  = require('./Routes/MenuRoutes');

// using routes 
app.use('/Person', PersonRoute);
app.use('/', MenuRoute);



//  listening port number 300
app.listen(PORT, () => {
  console.log("Server is on...");
});
