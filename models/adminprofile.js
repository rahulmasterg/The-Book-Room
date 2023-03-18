const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const adminSchema = new Schema({
    username : {
        type: String,
        required : true
    },
    password : {
        type: String,
        required : true
    },
    email:    { 
    
        type: String,     
        Required:  'Email address cannot be left blank.',
        
        validate: [validateEmail, 'Please fill a valid email address'],
             match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        index: {unique: true, dropDups: true}
        
        },
    city : {
        type : String
    },

    createdOn: {
        type: Date,
        default: Date.now()
    }

  
});
module.exports = mongoose.model('Admin', adminSchema);