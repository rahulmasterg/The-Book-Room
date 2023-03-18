//init code
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

// models
var Student= require('../models/student');
var Book= require('../models/book');
var Admin= require('../models/adminprofile');

// middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));


router.get('/admlogin',(req,res)=>{
    res.render('./admin/alogin',{
        pageTitle: 'Admin Page'
    });
});



router.post("/addadmin", (req, res) => {

    //hash password code
  
    const hashpassword = bcrypt.hashSync(req.body.password, 10);
  
    var myData = new Admin({
      username : req.body.username,
      password : hashpassword,
      email : req.body.email,
      city : req.body.city
    });
    myData.save()
    .then(item => {
    res.send("new admin added to database");
    })
    .catch(err => {
    res.status(400).send("unable to add to database");
    });
   });




//book profile from admin

router.get('/admpage/:id', (req,res)=>{

     //console.log(req.params.id);

     Book.findOne({_id : req.params.id } , function(err,resultbook){
          //check error  
          if(err){
               return res.send('find book profile error');
          }

          //if result is avialable
          if(resultbook){

               Student.find({}, function(err, students) {
                    if(err) {
                         console.log(err);
                    } else {
                         Book.find({}, function(err, books) {
                              if(err) {
                                   console.log(err)
                              } else {
                                   res.render('./admin/adminbookp',{
                                        pageTitle: 'Admin Book Page',
                                        pageID:'adminbookpage',       
                                        adminName: 'Rahul Singh',
                                        adminPhoto:'logo.png',
                                       // students: students,
                                        books : books,
                                        book : resultbook
                                      });
                              }  
                         }); 
                    }
               });

               

          }
     });                              
});



//book profile from admin

router.get('/admpagestu/:id', (req,res)=>{

     //console.log(req.params.id);

     Student.findOne({_id : req.params.id } , function(err,resultstudent){
          //check error  
          if(err){
               return res.send('find student profile error');
          }

       //if result is avialable
          if(resultstudent){

               Student.find({}, function(err, students) {
                    if(err) {
                         console.log(err);
                    } else {
                         Book.find({}, function(err, books) {
                              if(err) {
                                   console.log(err)
                              } else {
                                   res.render('./admin/adminstudentp',{
                                        pageTitle: 'Admin Book Page',
                                        pageID:'adminbookpage',       
                                        adminName: 'Rahul Singh',
                                        adminPhoto:'logo.png',
                                        students: students,
                                      //  books : books,
                                       // book : resultbook
                                       student : resultstudent
                                      });
                              }  
                         }); 
                    }
               });

               

          }
     });                              
});






router.post('/alogin', function(req, res){

    Admin.findOne(
  
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
           Student.find({}, function(err, students) {
            if(err) {
                 console.log(err);
            } else {
                 Book.find({}, function(err, books) {
                      if(err) {
                           console.log(err)
                      } else {
                       res.render('./admin/admin',{
                           pageTitle: 'Admin Page',
                           pageID:'adminpage',       
                           adminName: result.username,
                           adminPhoto:'logo.png',
                           students: students,
                           books : books
                         });
                      }  
                 }); 
            }
       });2


  
         }else{
  
          res.render('./admin/alogin',{
            pageTitle: 'Admin Login Page',
            pageID:'alogin'
          });
  
         }
       }else{
  
          //return res.send('jhfjhk7');

          res.render('./admin/alogin',{
               pageTitle: 'Admin Login Page',
               pageID:'alogin'
             });
  
       }
      }
    );
  });




/*


router.get("/alogin", function(req, res) {
    Student.find({}, function(err, students) {
         if(err) {
              console.log(err);
         } else {
              Book.find({}, function(err, books) {
                   if(err) {
                        console.log(err)
                   } else {
                    res.render('./admin/admin',{
                        pageTitle: 'Admin Page',
                        pageID:'adminpage',       
                        adminName:'Rahul Singh',
                        adminPhoto:'logo.png',
                        students: students,
                        books : books
                      });
                   }  
              }); 
         }
    });

});

*/

    module.exports = router;

