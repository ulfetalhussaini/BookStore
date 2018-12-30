const express = require('express');
const app = express();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
var session = require('express-session');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var upload = require('express-fileupload');
const usersRoutes = require('./routes/user.route');
const bookRoutes = require('./routes/book.route');

app.use(cookieParser())
app.use(upload());
app.use(cors({
  credentials: true,
}));

  
  // MongoDB connection
  mongoose.set('useCreateIndex', true);
  mongoose.connect('mongodb://storebookDB:Hq091Lna@ds137404.mlab.com:37404/storebook', {
    useNewUrlParser: true
  });
  
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  
  // parse application/json
  app.use(bodyParser.json())
  
  // MiddleWare
  app.use(express.json());
  
  
  app.use('/api/user', usersRoutes);
  app.use('/api/book', bookRoutes);
  
  // Starting the server
  app.listen(PORT, () => {
    console.log('Running on port ' + PORT);
  });