var express = require('express');
var router = express.Router();


router.get('/studentLogin', function(req, res){


  res.render('./student/studentLogin',{
    pageTitle: 'Student Login Page',
    pageID:'studentlogin'
  });
});

module.exports = router;