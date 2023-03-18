var Admin = require('../models/adminprofile');

var db = process.env.MONGOURI;

var mongoose = require('mongoose');

//mongoose.connect("mongodb://localhost:27017/library_management");
mongoose.connect(db);
///add permission

mongoose.Promise = require('bluebird');

var admins = [
    new Admin({
       username: "rahulsingh",
        password: "rahul2020"
    })
    /*  uncomment if you want two admin user and for three or more use add comment line again;
 ,new Admin({
 username: "rajeevkushwaha",
 password: "rajeev"
 })*/

];




var done = 0;
for (var i = 0; i < admins.length; i++){
    admins[i].save(function(err, result){
        done++;
        if (done === admins.length){
            console.log('insert of catalog completed');
            //exit();
        }
    });
}



function exit() {
    mongoose.disconnect();
}