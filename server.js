const express = require('express');
const nodash = require('nodash');
const app = express();
// const passport = require('passport');

// import authentication file
const passport = require('./Authentic');
app.use(passport.initialize());

// Importing local files
const db = require('./db');
require('dotenv').config();

//  getting port number for listening from .env file
const PORT = process.env.Port || 3000 ; 


//  Middleware function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request mode to : ${req.originalUrl}`);
  next() ;
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session : false}) ;

// converting the data taken from UI to Json format
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/',function (req, res) {
  res.send('Welcome to our Hotel');
})

// getting  routes 
const PersonRoute  = require('./Routes/PersonRoute');
const MenuRoute  = require('./Routes/MenuRoutes');
const Person = require('./Models/Person');
const showMenus = require('./Models/Menus');

// using routes 
app.use('/Person', PersonRoute);
app.use('/', MenuRoute);



//  listening port number 300
app.listen(PORT, () => {
  console.log("Server is on...");
});
