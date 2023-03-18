const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookname : {
        type: String,
        required : true
    },
    auther : {
        type: String,
        required : true
    },
    total : {
        type: Number,
        required : true
    },
    likes : {
        type: Number,
        required : true
    },
    remain : {
        type : Number,
        required : true
    },
    image: { type : String}

});
module.exports = mongoose.model('Book', bookSchema);