//init code
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');


// models
var Student = require('../models/student');
var Book= require('../models/book');


// middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

// password hashed
//const hashpassword = bcrypt.hashSync(req.body.password, 10);

router.post('/student', function(req, res){

  Student.findOne(

    {email : req.body.email},
    function(error,result){
      //check error
      if(error){
        return res.send('fgcjhgvbkj');
      }

      // result is empty or not
     if(result){
       // when result variable contains document
       // match password

       const isMatch = bcrypt.compareSync(req.body.password, result.password);

       // check password is match

       if(isMatch){
         // password matched
         Book.find({}, function(err, books) {
          if(err) {
               console.log(err)
          } else {
           res.render('./student/student',{
               pageTitle: 'Student Page',
               pageID:'studentpage',       
               studentName: result.username,
               studentPhoto: result.image,
               student : result,
               books : books
             });
          }  
     });

       }else{

        res.render('./student/studentLogin',{
          pageTitle: 'Student Login Page',
          pageID:'studentlogin'
        });

       }
     }else{

        return res.send('jhfjhk7');

     }
    }
  );
});

module.exports = router;