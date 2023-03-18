//init code
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

// models
var Student= require('../models/student');
var Book= require('../models/book');

const { check, validationResult } = require('express-validator');

// middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));


router.post("/addstudent", (req, res) => {

  //hash password code

  const hashpassword = bcrypt.hashSync(req.body.password, 10);

  var myData = new Student({
    username : req.body.username,
    password : hashpassword,
    email : req.body.email,
    city : req.body.city,
    image : req.body.image
  });
  myData.save()
  .then(item => {
  res.send("new student added to database");
  })
  .catch(err => {
  res.status(400).send("unable to add to database");
  });
 });



 router.post("/addbook", (req, res) => {
  var myData = new Book(req.body);
  myData.save()
  .then(item => {
  res.send("New Book saved to database");
  })
  .catch(err => {
  res.status(400).send("unable to save to database");
  });
 });

 
module.exports = router;



