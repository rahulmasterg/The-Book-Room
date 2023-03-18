//init code 

const mongoose = require('mongoose');
const assert = require('assert');
const db_url = process.env.MONGOURI;

// CONNECTION CODE

mongoose.connect(db_url,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
}, function(error, link){
    //check error
    assert.equal(error, null, 'db connection failed');
    //console.log(error);

    //ok

    console.log('db connection success');
    //console.log(link);
});









/*

const mongoose= require('mongoose');

mongoose.connect("mongodb://localhost:27017/library_management",{ useNewUrlParser :"true"});

mongoose.connection.on("error",(err)=>{

    console.log("err",err);

});

mongoose.connection.on("connected",(err,res) => {
    console.log("mongoose is connected");
});



const mongoose= require('mongoose');

require('dotenv').config();

mongoose.Promise = global.Promise;
var url= process.env.MONGOURI;

mongoose.connect('mongodb://localhost:27017/library_management', {useNewUrlParser: true});

 */

//.then(()=> console.log('connect successfully')
//.catch((err)=> console.error(err)));
