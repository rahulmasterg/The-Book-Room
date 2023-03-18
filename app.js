var dotenv= require('dotenv').config();
const express= require('express');
const bodyParser = require('body-parser');
var morgan = require('morgan'); 
var mongoose = require('mongoose');
const database = require('./mongo');
const studentRoutes = require('./routes/admin');

const bcrypt = require('bcryptjs');

var db = process.env.MONGOURI;
var port = process.env.PORT;

const app=express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(morgan('dev'));

// Set view Engines
app.set('view engine', 'ejs');
app.use(express.static('public'));

//mongodb connection
require('./mongo');
mongoose.connect(db);

// models
require('./models/student');
require('./models/book');
require('./models/adminprofile');

//Import routes
app.use(require('./routes/index'));
app.use(require('./routes/adminprofile'));
app.use(require('./routes/student/studentLogin'));
app.use(require('./routes/student'));
app.use(require('./routes/admin'));
app.use(require('./routes/contact'));
app.use(require('./routes/about'));

app.listen(port,()=>{
    console.log('server is running on port number '+ port);
});